// src/screens/LoginScreen.js
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Sign In</Text>

      {/* Email Field */}
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />

      {/* Password Field */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.replace("/(drawer)");
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create Account Link */}
      <TouchableOpacity
        onPress={() => {
          router.push("/signup");
        }}
      >
        <Text style={styles.link}>Don’t have an account? Create account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5EDE5",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#808000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#808000",
    fontSize: 16,
  },
});

export default LoginScreen;
