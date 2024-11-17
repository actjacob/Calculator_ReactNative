import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";

export default function ButtonComponent({ title, onPress, isBlue, isGray }) {
  const theme = useContext(ThemeContext);
  const buttonStyle = isBlue
    ? Styles.btnBlue
    : isGray
    ? Styles.btnGray
    : theme === "light"
    ? Styles.btnLight
    : Styles.btnDark;
  const textStyle =
    theme === "dark" ? Styles.smallTextDark : Styles.smallTextLight;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
