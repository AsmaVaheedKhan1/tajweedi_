// app/surah/[surahId].js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function SurahDetails() {
  const { surahId } = useLocalSearchParams(); // Get the Surah ID from the URL
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`
        );
        console.log(response.data.data); // Log the API response
        setSurah(response.data.data);
      } catch (error) {
        console.error("Error fetching Surah details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahDetails();
  }, [surahId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!surah) {
    return (
      <View style={styles.container}>
        <Text>Failed to load Surah data.</Text>
      </View>
    );
  }

  // Remove Bismillah from the Ayahs
  const updatedAyahs = surah.ayahs.map((ayah) => ({
    ...ayah,
    text: ayah.text
      .replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "")
      .trim(),
  }));

  const formattedAyahs = updatedAyahs
    .map((ayah) => `${ayah.text} (${ayah.numberInSurah})`) // Append Ayah number
    .join(" "); // Combine Ayahs into a single string

  return (
    <View style={styles.container}>
      <Text style={styles.surahName}>{surah.englishName}</Text>
      <Text style={styles.ayahText}>
        {"بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
      </Text>

      <Text style={styles.ayahText}>{formattedAyahs}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F5EDE5",

    // backgroundColor: "#F5EDE5", // Set the background color
    padding: 16,
    borderRadius: 8,
    // padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  surahName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  ayahText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center", // Right-align for Arabic text
    lineHeight: 30, // Adjust line height for better readability
  },
});
