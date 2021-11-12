import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { Heading, Spinner } from "native-base"

export default function Loading({ isLoading = true, finishedLoadingMsg }) {
  return (
    <>
      {isLoading && (
        <View
          pointerEvents={isLoading ? "auto" : "none"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 999,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}>
          <View
            pointerEvents={isLoading ? "auto" : "none"}
            style={{
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            {isLoading & !finishedLoadingMsg ? (
              <Spinner size={"lg"} mt={25} accessibilityLabel="Loading tasks" />
            ) : null}
            <Heading color="primary.500" fontSize="xl">
              {finishedLoadingMsg ? finishedLoadingMsg : null}
            </Heading>
          </View>
        </View>
      )}
    </>
  )
}
