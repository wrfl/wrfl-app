import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ListenScreen from '../screens/ListenScreen'
import PlaylistScreen from '../screens/PlaylistScreen'
import ScheduleScreen from '../screens/ScheduleScreen'
import {
  BottomTabParamList,
  ListenParamList,
  PlaylistParamList,
  ScheduleParamList,
} from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName={'Listen'}
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name={'Listen'}
        component={ListenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name={'ios-home'} color={color} />,
        }}
      />
      <BottomTab.Screen
        name={'Playlist'}
        component={PlaylistNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name={'ios-list'} color={color} />,
        }}
      />
      <BottomTab.Screen
        name={'Schedule'}
        component={ScheduleNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name={'ios-calendar'} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ListenStack = createStackNavigator<ListenParamList>()

function ListenNavigator() {
  return (
    <ListenStack.Navigator>
      <ListenStack.Screen
        name={'ListenScreen'}
        component={ListenScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </ListenStack.Navigator>
  )
}

const PlaylistStack = createStackNavigator<PlaylistParamList>()
function PlaylistNavigator() {
  return (
    <PlaylistStack.Navigator>
      <PlaylistStack.Screen
        name={'PlaylistScreen'}
        component={PlaylistScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </PlaylistStack.Navigator>
  )
}

const ScheduleStack = createStackNavigator<ScheduleParamList>()
function ScheduleNavigator() {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name={'ScheduleScreen'}
        component={ScheduleScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </ScheduleStack.Navigator>
  )
}
