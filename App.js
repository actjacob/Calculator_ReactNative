import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Button,
  SafeAreaView,
} from "react-native";
import { ThemeContext } from "./src/context/ThemeContext";
import { myColors } from "./src/styles/Colors";
import ButtonComponent from "./src/components/Button";
import MyKeyboard from "./src/components/MyKeyBoard";
import Orientation from "react-native-orientation-locker";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const lockPortrait = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      } catch (error) {
        console.error("ekran yönlendirme hatasi: ", error);
      }
    };

    lockPortrait();

    const orientationChangeListener = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      console.log("Yönlendirme:", orientation);
    };

    const subscription = ScreenOrientation.addOrientationChangeListener(
      orientationChangeListener
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === "light"
            ? styles.container
            : [styles.container, { backgroundColor: "#000" }]
        }
      >
        <StatusBar style="auto" />
        <Switch
          value={theme === "light"}
          onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
          thumbColor={theme === "light" ? myColors.blue : "#f4f3f4"}
          style={styles.switch}
          trackColor={{
            false: "#767577", // Kapalıyken (gri ton)
            true: "#767577", // Açıkken (mavi ton)
          }}
          ios_backgroundColor="#3e3e3e" // iOS'ta arka plan rengi (kapalı durumdayken)
        />
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  switch: {
    marginTop: 30,
  },
});
