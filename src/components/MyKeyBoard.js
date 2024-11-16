import * as React from "react";
import { useState } from "react";
import ButtonComponent from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [isResultShown, setIsResultShown] = useState(false);

  const handleNumberPress = (buttonValue) => {
    if (buttonValue === "." && firstNumber.includes(".")) return; // Birden fazla nokta olmasın
    if (firstNumber === "0" && buttonValue !== ".") return; // İlk karakter 0 ve ardından sayı gelmesin

    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
      setResult(firstNumber + buttonValue);
      // if (result === null && firstNumber === " ") {
      //   setResult(firstNumber + buttonValue); // İlk sayı yazıldığında, result da ilk sayı olsun
      // }
    }
  };

  const handleOperationPress = (buttonValue) => {
    if (firstNumber === "") return;

    if (buttonValue === "+/-") {
      if (firstNumber !== "") {
        setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
        setResult((prev) => (parseFloat(prev) * -1).toString());
      }
    } else if (buttonValue === "%") {
      if (firstNumber !== "") {
        setFirstNumber((prev) => (parseFloat(prev) / 100).toString());
        setResult((prev) => (parseFloat(prev) / 100).toString());
      }
    } else {
      if (secondNumber === "") {
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber("");
        setResult(firstNumber);
      }
      setIsResultShown(false); // Sonuç gösterilmeden önce false yapıyoruz
    }
  };

  const clear = () => {
    setOperation("");
    setSecondNumber("");
    setFirstNumber("");
    setResult(null);
    setIsResultShown(false);
  };

  const getResult = () => {
    if (firstNumber === "" || secondNumber === "") return;

    let calculatedResult;
    switch (operation) {
      case "+":
        calculatedResult = parseFloat(secondNumber) + parseFloat(firstNumber);
        break;
      case "-":
        calculatedResult = parseFloat(secondNumber) - parseFloat(firstNumber);
        break;
      case "*":
        calculatedResult = parseFloat(secondNumber) * parseFloat(firstNumber);
        break;
      case "/":
        if (parseFloat(firstNumber) === 0) {
          calculatedResult = "Hata"; // Sıfıra bölünemez
        } else {
          calculatedResult = parseFloat(secondNumber) / parseFloat(firstNumber);
        }
        break;
      default:
        calculatedResult = firstNumber;
        break;
    }

    setResult(calculatedResult);
    setIsResultShown(true); // Sonucu gösterirken true yapıyoruz
  };

  const handleBackspace = () => {
    setFirstNumber(firstNumber.slice(0, -1));
    setResult(firstNumber.slice(0, -1));
  };

  const displayScreen = () => {
    return (
      <View>
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}{" "}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {" "}
            {operation}
          </Text>{" "}
          {firstNumber}
        </Text>

        <Text
          style={[
            Styles.screenFirstNumber,
            {
              color: myColors.black,
              fontSize: isResultShown ? 50 : 30,
              fontWeight: isResultShown ? "normal" : "bold",
            },
          ]}
        >
          {isResultShown ? `= ${result}` : result || firstNumber}
        </Text>
      </View>
    );
  };

  return (
    <View style={Styles.viewBottom}>
      {/* Üst Ekran */}
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        {displayScreen()}
      </View>

      {/* Tuş Takımı */}
      <View style={Styles.row}>
        <ButtonComponent title="C" isGray onPress={clear} />
        <ButtonComponent
          title="+/-"
          isGray
          onPress={() => handleOperationPress("+/-")}
        />
        <ButtonComponent
          title="%"
          isGray
          onPress={() => handleOperationPress("%")}
        />
        <ButtonComponent
          title="÷"
          isBlue
          onPress={() => handleOperationPress("/")}
        />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="7" onPress={() => handleNumberPress("7")} />
        <ButtonComponent title="8" onPress={() => handleNumberPress("8")} />
        <ButtonComponent title="9" onPress={() => handleNumberPress("9")} />
        <ButtonComponent
          title="×"
          isBlue
          onPress={() => handleOperationPress("*")}
        />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="4" onPress={() => handleNumberPress("4")} />
        <ButtonComponent title="5" onPress={() => handleNumberPress("5")} />
        <ButtonComponent title="6" onPress={() => handleNumberPress("6")} />
        <ButtonComponent
          title="-"
          isBlue
          onPress={() => handleOperationPress("-")}
        />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="1" onPress={() => handleNumberPress("1")} />
        <ButtonComponent title="2" onPress={() => handleNumberPress("2")} />
        <ButtonComponent title="3" onPress={() => handleNumberPress("3")} />
        <ButtonComponent
          title="+"
          isBlue
          onPress={() => handleOperationPress("+")}
        />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="." onPress={() => handleNumberPress(".")} />
        <ButtonComponent title="0" onPress={() => handleNumberPress("0")} />
        <ButtonComponent title="<" onPress={handleBackspace} />
        <ButtonComponent title="=" isBlue onPress={getResult} />
      </View>
    </View>
  );
}
