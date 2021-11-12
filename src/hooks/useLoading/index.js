import React, { useState } from "react"
import { View } from "react-native"
import { Button } from "native-base"

function LoadingComp(loadingState) {
  console.log(loadingState ? "box-only" : "none")
  return (
    <View
      pointerEvents={loadingState ? "box-only" : "none"}
      style={{
        opacity: loadingState ? 1 : 0,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 99999,
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,.5)",
      }}>
      <Button bgColor={"transparent"} size={"lg"} isLoading>
        {""}
      </Button>
    </View>
  )
}

export default function Loading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState)

  return {
    setIsLoading,
    LoadingComponent: () => LoadingComp(isLoading),
  }
}
