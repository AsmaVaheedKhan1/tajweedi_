// // import { Image, StyleSheet, Platform } from 'react-native';

// // import { HelloWave } from '@/components/HelloWave';
// // import ParallaxScrollView from '@/components/ParallaxScrollView';
// // import { ThemedText } from '@/components/ThemedText';
// // import { ThemedView } from '@/components/ThemedView';

// // export default function HomeScreen() {
// //   return (
// //     <ParallaxScrollView
// //       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
// //       headerImage={
// //         <Image
// //           source={require('@/assets/images/partial-react-logo.png')}
// //           style={styles.reactLogo}
// //         />
// //       }>
// //       <ThemedView style={styles.titleContainer}>
// //         <ThemedText type="title">Welcome!</ThemedText>
// //         <HelloWave />
// //       </ThemedView>
// //       <ThemedView style={styles.stepContainer}>
// //         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
// //         <ThemedText>
// //           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
// //           Press{' '}
// //           <ThemedText type="defaultSemiBold">
// //             {Platform.select({
// //               ios: 'cmd + d',
// //               android: 'cmd + m',
// //               web: 'F12'
// //             })}
// //           </ThemedText>{' '}
// //           to open developer tools.
// //         </ThemedText>
// //       </ThemedView>
// //       <ThemedView style={styles.stepContainer}>
// //         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
// //         <ThemedText>
// //           Tap the Explore tab to learn more about what's included in this starter app.
// //         </ThemedText>
// //       </ThemedView>
// //       <ThemedView style={styles.stepContainer}>
// //         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
// //         <ThemedText>
// //           When you're ready, run{' '}
// //           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
// //           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
// //           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
// //           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
// //         </ThemedText>
// //       </ThemedView>
// //     </ParallaxScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   titleContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 8,
// //   },
// //   stepContainer: {
// //     gap: 8,
// //     marginBottom: 8,
// //   },
// //   reactLogo: {
// //     height: 178,
// //     width: 290,
// //     bottom: 0,
// //     left: 0,
// //     position: 'absolute',
// //   },
// // });

// // src/screens/HomeScreen.js
// import React from "react";
// import { View, Text, StyleSheet, Image } from "react-native";

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("@/assets/images/logo.png")}
//         style={styles.logo}
//       />
//       <Text style={styles.title}>Home</Text>
//       {/* <Text style={styles.text}>Account is viewed by the size bar</Text> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default HomeScreen;
// src/screens/LoginScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Redirect, router } from "expo-router";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext

export default function Index() {
  //   const { user } = useAuth(); // Get the authentication state

  //   const { user } = useAuth(); // Get the authentication state
  const user = false;
  // If the user is logged in, redirect to the home screen
  if (user) {
    return <Redirect href="/(drawer)/drawer" />;
  }

  // If the user is not logged in, redirect to the login screen
  return <Redirect href="/login" />;
  //     return (

  //     // <View style={styles.container}>
  //       {/* <Image
  //         source={require("@/assets/images/logo.png")}
  //         style={styles.logo}
  //       />
  //       <Text style={styles.title}>Tajweedi</Text>
  //       <TextInput style={styles.input} placeholder="Event" />
  //       <TextInput style={styles.input} placeholder="Password" secureTextEntry />
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={() => {
  //           router.replace("/(drawer)/home");
  //         }}
  //       >
  //         <Text style={styles.buttonText}>Sign In</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //       //   onPress={() => navigation.navigate("Register")}
  //       >
  //         <Text style={styles.link}>Don’t have an account? Create account</Text>
  //       </TouchableOpacity> */}
  //     // </View>
  //   );
}
