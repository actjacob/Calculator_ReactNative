import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../Contexts/ThemeContext";

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.text }]}>{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default ThemeSwitch;
