import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import CustomHeader from "../../components/CustomHeader";

const surahs = [
  { id: 114, name: "Surah An-Nas" },
  { id: 109, name: "Surah Al-Kafirun" },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CustomHeader />
      <FlatList
        data={surahs}
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.surahItem}
            onPress={() => router.push(`/surah/${item.id}`)}
          >
            <Text style={styles.surahName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EDE5", // Set the background color
    padding: 16,
  },
  surahItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#F5EDE5",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  surahName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
