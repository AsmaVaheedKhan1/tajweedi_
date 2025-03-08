// app/(drawer)/_layout.js
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/CustomDrawerContent"; // Custom drawer content

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Hide the default header
        drawerPosition: "left", // Drawer position
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
        }}
      />
    </Drawer>
  );
}
