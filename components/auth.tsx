import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/auth-context";

const AuthForm: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signIn, signUp } = useContext(AuthContext);
  
  const handleSubmit = () => {
    if (isRegistering) {
      signUp(email, password, name);
    } else {
      signIn(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{isRegistering ? "Register" : "Login"}</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textField}
      />
      <TextInput
        placeholder="Password"
        value={password ? password : ""}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textField}
      />
      {isRegistering && (
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.textField}
        />
      )}
      <Button
        title={isRegistering ? "Register" : "Login"}
        onPress={handleSubmit}
      />
      <Button
        title={
          isRegistering
            ? "Have an account? Login"
            : "Don't have an account? Register"
        }
        onPress={() => setIsRegistering(!isRegistering)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  textField: {
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default AuthForm;
