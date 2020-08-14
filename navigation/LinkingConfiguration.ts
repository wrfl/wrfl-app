import * as Linking from 'expo-linking'

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Listen: {
            screens: {
              ListenScreen: 'listen',
            },
          },
          Playlist: {
            screens: {
              PlaylistScreen: 'playlist',
            },
          },
          Schedule: {
            screens: {
              ScheduleScreen: 'schedule',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
}
