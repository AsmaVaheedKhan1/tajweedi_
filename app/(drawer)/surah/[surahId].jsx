import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, ActivityIndicator, TouchableOpacity,
  Platform
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Microphone icon
import { SafeAreaView } from "react-native-safe-area-context"; // iPhone compatibility
import { Audio } from "expo-av"; // For recording and playing
import axios from "axios";

export default function SurahDetails() {
  const toIndicNumber = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number.toString().split("").map((digit) => arabicNumbers[digit]).join("");
  };

  const { surahId } = useLocalSearchParams();
  const router = useRouter();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState();
  const [selectedAyah, setSelectedAyah] = useState(null); // New state for selected Ayah

  useEffect(() => {
    const fetchSurahDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`
        );

        const formattedSurah = {
          ...response.data.data,
          englishName: response.data.data.englishName === "An-Naas" ? "Al-Nas" : response.data.data.englishName
        };

        setSurah(formattedSurah);
      } catch (error) {
        console.error("Error fetching Surah details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahDetails();
  }, [surahId]);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      setRecording(null);
      setIsRecording(false);
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const handleAyahSelect = (ayah) => {
    setSelectedAyah(ayah); // Set the selected Ayah
  };

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
        <Text style={styles.errorText}>Failed to load Surah data.</Text>
      </View>
    );
  }

  const updatedAyahs = surah.ayahs.map((ayah) => ({
    ...ayah,
    text: ayah.text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim(),
  }));

  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.surahContainer}>
        <Text style={styles.surahName}>
          <Text style={{ fontStyle: "italic" }}>{surah.englishName}</Text>
        </Text>
        <Text style={styles.ayahText}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>

        <Text style={styles.continuousAyahText}>
          {updatedAyahs.map((ayah) => (
            <Text
              key={ayah.numberInSurah}
              onPress={() => handleAyahSelect(ayah)} // Handle Ayah selection
              style={[
                selectedAyah?.numberInSurah === ayah.numberInSurah
                  ? { color: "#8c8027" }
                  : { color: "#333" }, // Change color to red if selected, else default color
              ]}
            >
              {ayah.text} ({toIndicNumber(ayah.numberInSurah)}){" "}
            </Text>
          ))}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingActive]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons name={isRecording ? "stop-circle" : "mic"} size={30} color="#fff" />
      </TouchableOpacity>

      {sound && (
        <TouchableOpacity
          style={styles.playButton}
          onPress={async () => {
            if (sound) {
              await sound.replayAsync();
            }
          }}
        >
          <Text style={styles.playButtonText}>Play Recording</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F5EDE5",
    alignItems: "center",
    justifyContent: "center",
  },
  surahContainer: {
    backgroundColor: "#F1E6DC",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  ayahText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    lineHeight: 30,
    marginVertical: 5,
  },
  continuousAyahText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    lineHeight: 30,
  },
  recordButton: {
    position: "absolute",
    bottom: 150,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  recordingActive: {
    backgroundColor: "#E9967A",
  },
  playButton: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});