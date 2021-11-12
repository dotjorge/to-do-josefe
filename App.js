import React, { useContext } from "react"
import { NativeBaseProvider, useColorModeValue, extendTheme } from "native-base"

import { NavigationContainer } from "@react-navigation/native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

// Screens
import ToDo from "./src/screens/ToDo"
import Done from "./src/screens/Done"
import AddTask from "./src/screens/AddTask"

// Teste
import { View } from "react-native"
// Context
import TasksProvider, { TasksContext } from "./src/context/Tasks"

const Tab = createBottomTabNavigator()

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

// Extend the theme
const customTheme = extendTheme({ config })

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <TasksProvider>
        <Navigation />
      </TasksProvider>
    </NativeBaseProvider>
  )
}

function Navigation() {
  const { colors } = customTheme
  const activeColor = useColorModeValue(colors.darkBlue[400], colors.darkBlue[900])
  const inactiveColor = useColorModeValue(colors.light[600], colors.darkBlue[400])
  const { tasksAddedBadge, tasksDoneBadge } = useContext(TasksContext)

  function useBadge(badge) {
    return {
      tabBarBadge: badge,
      tabBarBadgeStyle: {
        backgroundColor: colors.darkBlue[50],
        color: colors.darkBlue[900],
        opacity: badge > 0 ? 1 : 0,
      },
    }
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            {
              /* Gambiarra alert, please ignore */
            }
            let iconName
            if (route.name === "To do") {
              iconName = "apps"
            } else if (route.name === "Done") {
              iconName = "checkbox"
            } else if (route.name === "Add task") {
              iconName = "add-circle"
            }
            {
              /* I'll fix 'em all */
            }
            return (
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={iconName}
                  size={route.name === "Add task" ? 80 : 35}
                  color={color}
                  style={[route.name === "Add task" && { marginTop: -40 }]}
                />
                {/* Especially this one :D */}
                {route.name === "Add task" && (
                  <View
                    style={[
                      {
                        position: "absolute",
                        top: -50,
                        height: 40,
                        overflow: "hidden",
                        zIndex: -1,
                      },
                      { transform: [{ scale: 1.2 }] },
                    ]}>
                    <Ionicons name={iconName} size={80} color={"#f2f2f2"} />
                  </View>
                )}
              </View>
            )
          },
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="To do" component={ToDo} options={useBadge(tasksAddedBadge)} />
        <Tab.Screen
          name="Add task"
          options={{ tabBarActiveTintColor: colors.primary[400] }}
          component={AddTask}
        />
        <Tab.Screen name="Done" component={Done} options={useBadge(tasksDoneBadge)} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
