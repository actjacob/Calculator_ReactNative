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
    if (buttonValue === "." && firstNumber.includes(".")) return; //
    if (firstNumber === "0" && buttonValue !== ".") return; // İlk

    if (firstNumber.length < 10) {
      const newValue = firstNumber + buttonValue;
      setFirstNumber(newValue);

      if (operation && secondNumber) {
        const interimResult = calculatedResult(
          secondNumber,
          newValue,
          operation
        );
        setResult(interimResult);
      } else {
        setResult(newValue);
      }
    }
  };

  const handleOperationPress = (buttonValue) => {
    if (!firstNumber && !result && !secondNumber) return; //İlk sayı, ikinci sayı veya önceki sonuç yoksa işlem yapma

    if (buttonValue === "+/-") {
      setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
      setResult((prev) => (parseFloat(prev) * -1).toString());
    } else if (buttonValue === "%") {
      setFirstNumber((prev) => (parseFloat(prev) / 100).toString());
      setResult((prev) => (parseFloat(prev) / 100).toString());
    } else {
      //   if (result && !secondNumber) {
      //     // Önceki bir sonuç varsa ve ikinci sayı yoksa
      //     setSecondNumber(result.toString());
      //   } else if (!secondNumber) {
      //     // Normal işlem
      //     setSecondNumber(firstNumber);
      //   }
      //   setOperation(buttonValue);
      //   setFirstNumber("");
      //   setIsResultShown(false);
      // }
      if (result && !secondNumber) {
        setSecondNumber(result.toString());
      } else if (!secondNumber) {
        setSecondNumber(firstNumber);
      }

      if (operation && firstNumber !== "") {
        // Önceki işlem sonucuyla yeni girilen sayıyı işlemle birleştiriyoruz
        setSecondNumber(
          calculatedResult(secondNumber, firstNumber, operation).toString()
        );
      }

      // Yeni işlem türünü güncelle
      setOperation(buttonValue);
      setFirstNumber(""); // Sonraki sayıyı girebilmek için sıfırla
      setIsResultShown(false); // Sonucu gizle
    }
  };

  const calculatedResult = (num1, num2, op) => {
    let calculatedResult;
    switch (op) {
      case "+":
        calculatedResult = parseFloat(num1) + parseFloat(num2);
        break;
      case "-":
        calculatedResult = parseFloat(num1) - parseFloat(num2);
        break;
      case "*":
        calculatedResult = parseFloat(num1) * parseFloat(num2);
        break;
      case "/":
        calculatedResult =
          parseFloat(num2) === 0 ? "Hata" : parseFloat(num1) / parseFloat(num2);
        break;
      default:
        calculatedResult = num2;
        break;
    }
    return calculatedResult;
  };

  const clear = () => {
    setOperation("");
    setSecondNumber("");
    setFirstNumber("");
    setResult(null);
    setIsResultShown(false);
  };

  const handleBackspace = () => {
    setFirstNumber(firstNumber.slice(0, -1));
    setResult(firstNumber.slice(0, -1));
  };

  const displayScreen = () => {
    return (
      <View>
        {/* İkinci ve birinci sayı ile operatör */}
        <Text style={Styles.screenSecondNumber}>
          <Text
            style={{
              fontWeight: "bold", // SecondNumber bold
            }}
          >
            {secondNumber}
          </Text>{" "}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {operation}
          </Text>{" "}
          <Text style={{ fontWeight: firstNumber ? "bold" : "normal" }}>
            {firstNumber}
          </Text>
        </Text>

        {/* Sonuç */}
        <Text
          style={[
            Styles.screenFirstNumber,
            {
              color: myColors.black,
              fontSize: isResultShown ? 50 : 30,
              fontWeight: isResultShown ? "bold" : "normal",
            },
          ]}
        >
          {isResultShown ? `= ${result}` : result || firstNumber}
        </Text>
      </View>
    );
  };
  const getResult = () => {
    if (!firstNumber || !secondNumber || !operation) return;

    const finalResult = calculatedResult(secondNumber, firstNumber, operation);
    setResult(finalResult);
    setSecondNumber(finalResult.toString());
    setFirstNumber("");
    setIsResultShown(true); // Sonucu bold yapmak için true
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
