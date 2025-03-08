// import { Slot } from "expo-router";
// import { useEffect } from "react";
// import * as SplashScreen from "expo-splash-screen";
// import CustomSplashScreen from "../components/CustomSplashScreen";

// export default function RootLayout() {
//   useEffect(() => {
//     // Prevent auto-hiding the splash screen
//     SplashScreen.preventAutoHideAsync();
//   }, []);

//   return (
//     <>
//       <CustomSplashScreen />
//       <Slot /> {/* This renders the current route */}
//     </>
//   );
// }

import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import CustomSplashScreen from "../components/CustomSplashScreen";
import { View } from "react-native";

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Simulate loading (e.g., load fonts, fetch data, etc.)
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay for testing
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
    return <CustomSplashScreen />; // Show the custom splash screen while loading
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5EDE5",
      }}
    >
      <Slot />
    </View>
  );
}
