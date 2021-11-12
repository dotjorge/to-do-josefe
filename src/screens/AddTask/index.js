import React, { useContext, useState, useRef, useEffect } from "react"
import { Input, VStack, Icon, Box, FormControl, Button } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import { TasksContext } from "../../context/Tasks"
import SafeAreaView from "../../components/SafeAreaView"
import { useIsFocused } from "@react-navigation/native"
import api from "../../api"

export default function AddTask({ navigation }) {
  const [taskToAdd, setTaskToAdd] = useState({ title: "", description: "" })
  const [isAdding, setIsAdding] = useState(false)
  const { updateTasks, addTasksCreatedBadge, setIsLoading } = useContext(TasksContext)

  // Input refs
  const titleRef = useRef()
  const descRef = useRef()

  // -------------------------------
  // When screen is loaded/selected,
  // focus the first input.
  // Commented cuz it is VERY slow!
  // -------------------------------
  // const screenIsLoaded = useIsFocused()
  // useEffect(() => {
  //   if (screenIsLoaded) {
  //     titleRef.current.focus()
  //   }
  // }, [screenIsLoaded])

  function handleAdd(taskInfo) {
    setIsLoading(true)
    api
      .post(`/tasks`, { ...taskInfo })
      .then(() => {
        updateTasks()
        addTasksCreatedBadge()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <SafeAreaView>
      <Box alignItems="stretch" p="8" marginX={"auto"} maxW={"xl"} width={"full"}>
        <VStack alignItems="stretch" space="5">
          <FormControl>
            <FormControl.Label mb="3">Add a task to do</FormControl.Label>
            <Input
              ref={titleRef}
              onSubmitEditing={() => {
                console.log("Enter :D")
                descRef.current.focus()
              }}
              ariaLabel={"Task title"}
              value={taskToAdd.title}
              onChangeText={text => setTaskToAdd({ ...taskToAdd, title: text })}
              placeholder="Title"
            />
          </FormControl>
          <FormControl>
            <Input
              ref={descRef}
              ariaLabel={"Task description"}
              value={taskToAdd.description}
              onChangeText={text => setTaskToAdd({ ...taskToAdd, description: text })}
              placeholder="Description"
            />
          </FormControl>
        </VStack>
        <Button
          ariaLabel={"Add task"}
          mt="5"
          isLoading={isAdding}
          isLoadingText="Adding"
          rightIcon={<Icon as={Ionicons} name="add" size="sm" />}
          onPress={() => {
            handleAdd(taskToAdd)
            setTaskToAdd({ title: "", description: "" })
            //navigation.navigate("To do")
          }}>
          {" "}
        </Button>
      </Box>
    </SafeAreaView>
  )
}
