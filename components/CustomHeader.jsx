// components/CustomHeader.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Use any icon library

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Tajweedi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F5EDE5",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
});

export default CustomHeader;
