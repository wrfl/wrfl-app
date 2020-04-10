import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Audio } from 'expo-av'

const LAST_PLAYED_URL = 'http://wrfl.fm/plays/last.json'
const REFRESH_LAST_PLAYED_INTERVAL = 10000
const STREAM_URL = 'http://wrfl.fm:9000/stream/1'

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true
})

const stream = new Audio.Sound()

export default function App() {
  const [lastPlayedSong, setLastPlayedSong] = useState({
    artist: '',
    track: ''
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    getLastPlayedSongData()
    const lastPlayedSongInterval = setInterval(getLastPlayedSongData, REFRESH_LAST_PLAYED_INTERVAL)
    return () => {
      clearInterval(lastPlayedSongInterval)
    }
  }, [])

  async function onPressTogglePlay () {
    if (isPlaying) {
      try {
        console.log('trying to pause...')
        await stream.pauseAsync()
        setIsPlaying(false)
      } catch (error) {
        // An error occurred!
      }
    } else {
      try {
        if (!isLoaded) {
          await stream.loadAsync({ uri: STREAM_URL })
          setIsLoaded(true)
        }
        await stream.playAsync()
        setIsPlaying(true)
      } catch (error) {
        // An error occurred!
      }
    }
  }

  async function getLastPlayedSongData () {
    const response = await fetch(LAST_PLAYED_URL)
    const lastPlayed = await response.json()
    console.log(lastPlayed)
    setLastPlayedSong(lastPlayed)
  }

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={onPressTogglePlay} />
      <Text>{lastPlayedSong.artist}</Text>
      <Text>{lastPlayedSong.track}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
