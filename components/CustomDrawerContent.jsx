// components/CustomDrawerContent.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";

const CustomDrawerContent = (props) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* User Name */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          //   justifyContent: "center",
        }}
      >
        <Image
          source={require("@/assets/images/dummy.png")}
          resizeMode="contain"
          style={{ width: 80, height: 80, resizeMode: "contain" }}
        />

        <Text style={styles.userName}>User</Text>
      </View>

      <TouchableOpacity
        style={styles.termsButton}
        // onPress={() => router.push("/terms")}
      >
        <Text style={styles.termsText}>User Info</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.termsButton}
        // onPress={() => router.push("/terms")}
      >
        <Text style={styles.termsText}>Progress Data</Text>
      </TouchableOpacity>

      {/* Terms of Service */}
      <TouchableOpacity
        style={styles.termsButton}
        // onPress={() => router.push("/terms")}
      >
        <Text style={styles.termsText}>Terms of Service</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.logText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5EDE5",
  },
  logoContainer: {
    // alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    // marginTop: 20,

    width: 100,
    height: 100,
    // borderRadius: 50,
  },
  userName: {
    // marginTop: 20,

    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  userContainer: {},
  userInfoContainer: {
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  termsButton: {
    padding: 12,
    backgroundColor: "#F5EDE5",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  logoutButton: {
    padding: 12,
    backgroundColor: "#f00",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  logText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  termsText: {
    fontSize: 14,
    color: "#333",
  },
});

export default CustomDrawerContent;
