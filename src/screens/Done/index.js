import React, { useContext, useEffect, useState } from "react"
import {
  IconButton,
  Checkbox,
  Text,
  Box,
  Button,
  VStack,
  HStack,
  Icon,
  Center,
  Spacer,
  FlatList,
} from "native-base"
import { Ionicons } from "@expo/vector-icons"
import { TasksContext } from "../../context/Tasks"
import { useIsFocused } from "@react-navigation/native"
import SafeAreaView from "../../components/SafeAreaView"
import api from "../../api"
import Loading from "../../components/Loading"

export default function Done({ navigation }) {
  const { tasks, updateTasks, addTasksCreatedBadge, resetTasksDoneBadge, setIsLoading } =
    useContext(TasksContext)

  // When screen is loaded/selected
  const screenIsLoaded = useIsFocused()
  useEffect(() => {
    if (screenIsLoaded) {
      resetTasksDoneBadge()
    }
  }, [screenIsLoaded])

  if (!tasks) return <Loading />

  const doneTasks = tasks.filter(task => task.finished === true)

  function handleUndone(taskId) {
    setIsLoading(true)
    api
      .put(`/tasks/${taskId}`, { finished: false })
      .then(() => {
        updateTasks()
        addTasksCreatedBadge()
      })
      .finally(() => setIsLoading(false))
  }

  function handleDelete(taskId) {
    setIsLoading(true)
    api
      .delete(`/tasks/${taskId}`)
      .then(() => {
        updateTasks()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <SafeAreaView>
      <Center style={{ padding: 20 }} flex={1}>
        <FlatList
          style={{ width: "100%" }}
          data={doneTasks}
          ListHeaderComponent={() => (
            <>
              {doneTasks.length === 0 && (
                <Box
                  flex={1}
                  alignItems="stretch"
                  p="8"
                  marginX={"auto"}
                  maxW={"xl"}
                  width={"full"}>
                  <Text mx="2">There's nothing done yet</Text>
                  <Button
                    mt="5"
                    leftIcon={<Icon as={Ionicons} name="arrow-back" size="xs" />}
                    onPress={() => {
                      navigation.navigate("To do")
                    }}>
                    Finish a task
                  </Button>
                </Box>
              )}
            </>
          )}
          renderItem={({ item, index }, task = item) => (
            <HStack
              space={3}
              justifyContent="space-between"
              w="100%"
              bgColor={"darkBlue.50"}
              style={[
                {
                  padding: 20,
                },
                index === 0 && {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
                index === doneTasks.length - 1 && {
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
                index.length === 1 && {
                  borderRadius: 20,
                },
              ]}
              justifyContent="space-between"
              alignItems="center">
              <Checkbox
                ariaLabel={"Undo task"}
                isChecked={task.finished}
                onChange={() => handleUndone(task.id)}>
                {" "}
              </Checkbox>
              <VStack>
                <Text
                  _dark={{
                    color: "darkBlue.900",
                  }}
                  color="darkBlue.300"
                  bold>
                  {item.title}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "light.200",
                  }}>
                  {item.description}
                </Text>
              </VStack>
              <Spacer />
              <IconButton
                ariaLabel={"Delete task"}
                size="sm"
                colorScheme="trueGray"
                icon={<Icon as={Ionicons} name="trash" size="sm" color="darkBlue.300" />}
                onPress={() => handleDelete(task.id)}
              />
            </HStack>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Center>
    </SafeAreaView>
  )
}
