import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

interface PlayProps {
  album: string
  artist: string
  created_at: string
  id: number
  playbox_id: number
  show_id: number
  show: ShowProps
  track: string
  updated_at: string
  url: string
}

interface ShowProps {
  color: string
  created_at: string
  id: number
  image: { url: string; thumb: { url: string } }
  long_bio: string
  name: string
  short_bio: string
  slug: string
  type: string
  updated_at: string
}

const PLAYS_URL = 'http://wrfl.fm/plays.json'

export default function TabTwoScreen() {
  const [page, setPage] = useState(1)
  const [plays, setPlays] = useState([])

  useEffect(() => {
    fetchData()
  }, [page])

  async function fetchData() {
    const response = await fetch(`${PLAYS_URL}?page=${page}`)
    const newPlays = await response.json()
    setPlays(newPlays)
  }

  function renderItem({ item }: { item: PlayProps }) {
    return (
      <View>
        <Text>{item.created_at}</Text>
        <Text>{item.track}</Text>
        <Text>{item.album}</Text>
        <Text>{item.artist}</Text>
        <Text>{item.show.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={plays} renderItem={renderItem} />
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
