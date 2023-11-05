import { useContext, useState } from "react";
import { FlatList, View, StyleSheet, Button } from "react-native";
import GoalItem from "./GoalItem";
import { AuthContext } from "../context/auth-context";
import { TodosContext } from "../context/todos-context";
import GoalInput from "./GoalInput";
import { Loader } from "./Loader";

const GoalList = () => {
  const context = useContext(AuthContext);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { items } = useContext(TodosContext);
  const openModal = () => {
    setModalIsVisible(true);
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };
  if (!items) {
    <Loader />;
  }

  return (
    <View style={styles.goalArea}>
      <GoalInput cancelModal={closeModal} modalIsVisible={modalIsVisible} />
      <Button title="Add Gaol" onPress={openModal} />

      <FlatList
        data={items}
        renderItem={(itemData) => {
          return <GoalItem id={itemData.item.id} text={itemData.item.body} />;
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />

      <Button title="LogOut" onPress={context.signOut} />
    </View>
  );
};

export default GoalList;

const styles = StyleSheet.create({
  goalArea: {
    flex: 4,
    marginTop: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
