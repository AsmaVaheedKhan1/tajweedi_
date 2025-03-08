import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";

const SurahCard = ({ surahNumber }) => {
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await axios.get(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
        );
        setSurah(response.data.data);
      } catch (error) {
        console.error("Error fetching Surah:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahNumber]);

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

  const formattedAyahs = formatAyahs(surah); // Format Ayahs with numbers

  return (
    <View style={styles.card}>
      <Text style={styles.surahName}>{surah.englishName}</Text>
      <Text></Text>
      <Text style={styles.ayahText}>{formattedAyahs}</Text>
    </View>
  );
};

const formatAyahs = (surah) => {
  return surah.ayahs
    .map((ayah) => `${ayah.text} (${ayah.numberInSurah})`) // Append Ayah number
    .join(" "); // Combine Ayahs into a single string
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  surahName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  ayahText: {
    fontSize: 18,
    color: "#333",
    textAlign: "right", // Right-align for Arabic text
    lineHeight: 30, // Adjust line height for better readability
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SurahCard;
