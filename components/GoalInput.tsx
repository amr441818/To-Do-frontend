import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { TodosContext } from "../context/todos-context";
interface InputProps {
  cancelModal: () => void;
  modalIsVisible: boolean;
}
const GoalInput: React.FC<InputProps> = (props) => {
  const [goal, setGoal] = useState("");
  const { addGoal } = useContext(TodosContext);
  const goalEnterdHandler = (enterdText: string) => {
    setGoal(enterdText);
  };

  const onPressHandler = () => {
    addGoal(goal);
    setGoal("");
    props.cancelModal();
  };
  const disable = goal === "" ? true : false;
  return (
    <Modal visible={props.modalIsVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your goals.."
          onChangeText={goalEnterdHandler}
          value={goal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add Goal"
              color="#530acc"
              onPress={onPressHandler}
              disabled={disable}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              color="#f31282"
              onPress={props.cancelModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    flex: 1,
    backgroundColor: "#311b6b",
  },
  textInput: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#efd0ff",
    backgroundColor: "#efd0ff",
    marginBottom: 10,
    textAlign: "center",
    color: "#120438",
    padding: 4,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    margin: 6,
  },
  image: {
    width: 100,
    height: 100,
    margin: 40,
  },
});
