import * as React from "react";
import ButtonComponent from "./Button";
import { View, Text, Button } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import { Ionicons } from "react-native-vector-icons";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState(null);

  const handleNumberPress = (buttonValue) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };
  const handleOperationPress = (buttonValue) => {
    if (buttonValue === "+/-") {
      setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
    } else {
      setOperation(buttonValue);
      setSecondNumber(firstNumber);
      setFirstNumber("");
    }
  };

  const clear = () => {
    setOperation("");
    setSecondNumber("");
    setFirstNumber("");
    setResult(null);
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
        break;
      case "-":
        clear();
        setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
        break;
      case "*":
        clear();
        setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
        break;
      case "/":
        clear();
        setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
        break;
      default:
        // setResult(0);
        setResult(firstNumber);
        break;
    }
    clear();
  };

  return (
    <>
      <View style={Styles.row}>
        <ButtonComponent title="C" isGray onPress={clear} />
        <ButtonComponent title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
        <ButtonComponent title="%" isGray onPress={() => handleOperationPress("%")} />
        <ButtonComponent title="/" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="7" onPress={() => handleNumberPress("7")} />
        <ButtonComponent title="8" onPress={() => handleNumberPress("8")} />
        <ButtonComponent title="9" onPress={() => handleNumberPress("9")} />
        <ButtonComponent title="x" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="4" onPress={() => handleNumberPress("4")} />
        <ButtonComponent title="5" onPress={() => handleNumberPress("5")} />
        <ButtonComponent title="6" anPress={() => handleNumberPress("6")} />
        <ButtonComponent title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="1" onPress={() => handleNumberPress("1")} />
        <ButtonComponent title="2" onPress={() => handleNumberPress("2")} />
        <ButtonComponent title="3" onPress={() => handleNumberPress("3")} />
        <ButtonComponent title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="." onPress={() => handleNumberPress(".")} />
        <ButtonComponent title="0" onPress={() => handleNumberPress("0")} />
        <ButtonComponent title="<" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
        <ButtonComponent title="=" isBlue onPress={() => getResult()} />
      </View>
    </>
  );
}
