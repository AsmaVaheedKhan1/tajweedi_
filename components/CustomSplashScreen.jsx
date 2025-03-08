import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const CustomSplashScreen = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading (e.g., fetch data, load fonts, etc.)
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>Elevate your Quranic Recitation</Text>
      </View>
    );
  }

  return null; // Render nothing when the app is ready
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
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontStyle: "italic",
  },
});

export default CustomSplashScreen;
