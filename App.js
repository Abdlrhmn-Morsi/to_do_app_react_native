import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const notCompletedTasksCount = tasks.length - completedTasksCount;

  const addOrUpdateTask = () => {
    if (task.length > 0) {
      if (editMode) {
        setTasks(
          tasks.map((taskItem) =>
            taskItem.id === editTaskId ? { ...taskItem, text: task } : taskItem
          )
        );
        setEditMode(false);
        setEditTaskId(null);
      } else {
        setTasks([
          ...tasks,
          { id: Date.now().toString(), text: task, completed: false },
        ]);
      }
      setTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTask(taskToEdit.text);
    setEditTaskId(id);
    setEditMode(true);
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        onPress={() => toggleTaskCompletion(item.id)}
        style={styles.task}
      >
        <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.taskButtons}>
        <TouchableOpacity
          onPress={() => editTask(item.id)}
          style={styles.editButton}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTask(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Completed: {completedTasksCount}</Text>
        <Text style={styles.statsText}>
          Not Completed: {notCompletedTasksCount}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={addOrUpdateTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>{editMode ? "Update" : "+"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  statsContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  statsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskList: {
    marginTop: 20,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  task: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  taskCompleted: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    backgroundColor: "#FFA500",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editText: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
  },
});
