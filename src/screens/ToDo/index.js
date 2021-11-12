import React, { useContext, useEffect } from "react"
import {
  Icon,
  IconButton,
  Button,
  Text,
  Box,
  VStack,
  HStack,
  Center,
  Spacer,
  FlatList,
  useColorModeValue,
  useTheme,
} from "native-base"
import { Ionicons } from "@expo/vector-icons"
import { TasksContext } from "../../context/Tasks"
import { useIsFocused } from "@react-navigation/native"
import SafeAreaView from "../../components/SafeAreaView"
import api from "../../api"
import Loading from "../../components/Loading"

function roundedScrollView() {}

export default function ToDo({ navigation }) {
  const { colors } = useTheme()
  const taskBgColor = useColorModeValue(colors.darkBlue[300], colors.darkBlue[900])
  const { tasks, updateTasks, isUpdating, addTasksDoneBadge, resetTasksAddedBadge, setIsLoading } =
    useContext(TasksContext)

  // When screen is loaded/selected
  const screenIsLoaded = useIsFocused()
  useEffect(() => {
    if (screenIsLoaded) {
      resetTasksAddedBadge()
    }
  }, [screenIsLoaded])

  if (!tasks) return <Loading isLoading={true} />

  const undoneTasks = tasks.filter(task => task.finished === false)

  function handleFinish(taskId) {
    setIsLoading(true)
    api
      .patch(`/tasks/${taskId}`)
      .then(() => {
        updateTasks()
        addTasksDoneBadge()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <SafeAreaView>
      <Center style={{ padding: 20 }} flex={1}>
        <FlatList
          style={{ width: "100%", borderRadius: 20 }}
          extraData={tasks}
          data={undoneTasks}
          ListHeaderComponent={() => (
            <>
              {undoneTasks.length === 0 && (
                <Box
                  flex={1}
                  alignItems="stretch"
                  p="8"
                  marginX={"auto"}
                  maxW={"xl"}
                  width={"full"}>
                  <Text mx="2">There's nothing to do</Text>
                  <Button
                    mt="5"
                    ariaLabel={"Add something"}
                    rightIcon={<Icon as={Ionicons} name="arrow-forward" size="xs" />}
                    onPress={() => {
                      navigation.navigate("Add task")
                    }}>
                    Add something
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
              style={[
                {
                  backgroundColor: taskBgColor,
                  padding: 20,
                },
                index === 0 && {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
                index === undoneTasks.length - 1 && {
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
                index.length === 1 && {
                  borderRadius: 20,
                },
              ]}
              justifyContent="space-between"
              alignItems="center">
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="darkBlue.50"
                  bold>
                  {item.title}
                </Text>
                <Text
                  color="darkBlue.50"
                  _dark={{
                    color: "warmGray.200",
                  }}>
                  {item.description}
                </Text>
              </VStack>
              <Spacer />
              <IconButton
                size="sm"
                icon={
                  <Button
                    rightIcon={
                      <Icon
                        ariaLabel={"Finish task"}
                        as={Ionicons}
                        name="checkmark-done"
                        size="xs"
                      />
                    }
                    variant="subtle"
                    onPress={() => handleFinish(task.id)}>
                    Finish
                  </Button>
                }
              />
            </HStack>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Center>
    </SafeAreaView>
  )
}
