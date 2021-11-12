import React from "react"
import { SafeAreaView as OldSafeAreaView, View } from "react-native"
import Constants from "expo-constants"

export default function SafeAreaView({ children }) {
  return (
    <OldSafeAreaView style={{ paddingTop: Constants?.statusBarHeight | 0, flex: 1 }}>
      {children}
    </OldSafeAreaView>
  )
}
