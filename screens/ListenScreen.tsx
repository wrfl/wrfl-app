import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'
import * as Linking from 'expo-linking'
import fetchAlbumCoverArt from 'coverarturl'

import { Text, View } from '../components/Themed'

interface PlaylistItemProps {
  album?: string
  artist?: string
  track?: string
  show?: ShowProps
}
interface ShowProps {
  name: string
  show_url: string
}

const LAST_PLAYED_URL = 'http://wrfl.fm/plays/last.json'
const REFRESH_LAST_PLAYED_INTERVAL = 20000
const STREAM_URL = 'http://wrfl.fm:9000/stream/1'

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
})

const stream = new Audio.Sound()

export default function ListenScreen() {
  const [currentAlbumCoverArt, setCurrentAlbumCoverArt] = useState()
  const [lastPlayed, setLastPlayed] = useState<PlaylistItemProps>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    updateLastPlayedData()
  }, [])

  useEffect(() => {
    const lastPlayedInterval = setTimeout(() => {
      updateLastPlayedData()
    }, REFRESH_LAST_PLAYED_INTERVAL)
    return () => {
      clearTimeout(lastPlayedInterval)
    }
  }, [lastPlayed])

  function onPressOpenUrl(url: string) {
    Linking.openURL(url)
  }

  async function onPressTogglePlay() {
    if (isPlaying) {
      try {
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

  async function updateLastPlayedData() {
    const response = await fetch(LAST_PLAYED_URL)
    let newPlay = await response.json()
    setLastPlayed(newPlay)
    if (lastPlayed.track !== newPlay.track) {
      updateAlbumCoverArt()
    }
  }

  async function updateAlbumCoverArt() {
    const url = await fetchAlbumCoverArt({
      artist: lastPlayed.artist,
      release: lastPlayed.album,
    })
    setCurrentAlbumCoverArt(url)
  }

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={onPressTogglePlay} />
      <Text>{lastPlayed?.artist}</Text>
      <Text>{lastPlayed?.track}</Text>
      <Text>{lastPlayed?.album}</Text>

      <Image
        source={{ uri: currentAlbumCoverArt }}
        style={{ width: 200, height: 200, borderWidth: 2, borderColor: 'red' }}
      />

      <Text onPress={() => onPressOpenUrl(lastPlayed?.show?.show_url ?? '')}>
        Show: {lastPlayed?.show?.name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
