import React, { useContext } from "react";
import { TodosContext } from "../context/todos-context";
import { StyleSheet, View, Text, Pressable } from "react-native";
type ItemProps = {
  id: string;
  text: string;
};
const GoalItem: React.FC<ItemProps> = (props) => {
  const { deleteGoal } = useContext(TodosContext);
  const deleteGoalHandler = () => {
    deleteGoal(props.id);
  };
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={deleteGoalHandler}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#530acc",
    margin: 8,
    borderRadius: 6,
  },
  goalText: {
    color: "#fff",
    padding: 15,
  },
});
