// src/screens/RegisterScreen.js
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateFields = () => {
    let valid = true;
    let newErrors = { username: "", email: "", password: "" };

    // Validate Username
    if (!username) {
      newErrors.username = "Please enter your username";
      valid = false;
    }

    // Validate Email
    if (!email) {
      newErrors.email = "Please enter your email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Validate Password
    if (!password) {
      newErrors.password = "Please enter your password";
      valid = false;
    } else {
      if (!/[A-Z]/.test(password)) {
        newErrors.password = "Password must contain at least 1 uppercase letter";
        valid = false;
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = "Password must contain at least 1 lowercase letter";
        valid = false;
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = "Password must contain at least 1 number";
        valid = false;
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      router.replace("/(drawer)");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>

      {/* Username Field */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

      {/* Email Field */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      {/* Password Field */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Create Account</Text>
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
    marginBottom: 5,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: "10%",
    marginBottom: 10,
  },
});

export default RegisterScreen;
