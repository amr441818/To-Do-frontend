import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthForm from "./auth";
import GoalList from "./GoalList";
import { AuthContext } from "../context/auth-context";
import { TodosProvider } from "../context/todos-context";
import { Loader } from "./Loader";
const AppNav = () => {
  const { token, isLoading } = useContext(AuthContext);
  const Stack = createStackNavigator();
  if (isLoading) {
   <Loader/>
  }
  return (
    <TodosProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {token !== null ? (
            <Stack.Screen
              name="Home"
              component={GoalList}
              options={{ title: "Home" }}
            />
          ) : (
            <Stack.Screen
              name="AuthForm"
              component={AuthForm}
              options={{ title: "AuthForm" }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TodosProvider>
  );
};

export default AppNav;
