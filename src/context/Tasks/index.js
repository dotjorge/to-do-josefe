import React, { createContext, useState, useRef } from "react"
import api from "../../api"
import useSWR from "swr"
import Loading from "../../components/Loading"
import { View, Animated } from "react-native"

export const TasksContext = createContext()

export default function TasksProvider({ children }) {
  // Api
  const fetcher = url => api.get(url).then(res => res.data)
  const { data, error, mutate, isValidating } = useSWR("/tasks", fetcher)

  // Badge states
  const [tasksAddedBadge, setTasksAddedBadge] = useState(0)
  const [tasksDoneBadge, setTasksDoneBadge] = useState(0)

  // Loading logic
  const [isLoading, setIsLoadingState] = useState(false)
  const [finishedLoadingMsg, setFinishedLoadingMsg] = useState("")
  function setIsLoading(state) {
    if (state === true) return setIsLoadingState(true)
    setFinishedLoadingMsg("Done :)")

    setTimeout(() => {
      setFinishedLoadingMsg("")
      setIsLoadingState(false)
    }, 700)
  }

  // Badge functions
  const resetTasksAddedBadge = () => setTasksAddedBadge(0)
  const resetTasksDoneBadge = () => setTasksDoneBadge(0)

  function addTasksCreatedBadge() {
    setTasksAddedBadge(prevState => prevState + 1)
  }

  function addTasksDoneBadge() {
    setTasksDoneBadge(prevState => prevState + 1)
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: data,
        updateTasks: mutate,
        isUpdating: isValidating,
        tasksAddedBadge,
        tasksDoneBadge,
        addTasksCreatedBadge,
        addTasksDoneBadge,
        resetTasksAddedBadge,
        resetTasksDoneBadge,
        setIsLoading,
      }}>
      {isLoading && <Loading finishedLoadingMsg={finishedLoadingMsg} />}
      <View
        pointerEvents={isLoading ? "none" : "auto"}
        style={{
          flex: 1,
        }}>
        {children}
      </View>
    </TasksContext.Provider>
  )
}
