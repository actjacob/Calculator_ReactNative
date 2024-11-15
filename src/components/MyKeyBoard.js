import * as React from "react";
import ButtonComponent from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState(null);

  const handleNumberPress = (buttonValue) => {
    if (buttonValue === "." && firstNumber.includes(".")) return; // Birden fazla nokta olmasın
    if (firstNumber === "0" && buttonValue !== ".") return; // İlk karakter 0 ve ardından sayı gelmesin

    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue) => {
    if (firstNumber === "") return;

    if (buttonValue === "+/-") {
      if (firstNumber !== "") {
        setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
      }
    } else if (buttonValue === "%") {
      if (firstNumber !== "") {
        setFirstNumber((prev) => (parseFloat(prev) / 100).toString());
      }
    } else {
      if (secondNumber === "") {
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber("");
      }
    }
  };

  const clear = () => {
    setOperation("");
    setSecondNumber("");
    setFirstNumber("");
    setResult(null);
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

    setResult(calculatedResult); // Sonucu ayarlıyoruz
    setFirstNumber(calculatedResult.toString()); // Sonucu ilk sayıya ekliyoruz
    setSecondNumber(""); // İkinci sayıyı sıfırlıyoruz
    setOperation(""); // İşlemi sıfırlıyoruz
  };

  // Son karakteri siler
  const handleBackspace = () => {
    setFirstNumber(firstNumber.slice(0, -1));
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={[
            Styles.screenFirstNumber,
            { color: myColors.result, fontSize: result < 99999 ? 50 : 40 },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {result?.toString()}
        </Text>
      );
    }

    if (firstNumber === "" && secondNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }

    if (firstNumber === "" && secondNumber !== "") {
      return (
        <Text
          style={[
            Styles.screenFirstNumber,
            { fontSize: secondNumber.length > 7 ? 50 : 100 },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {secondNumber}
        </Text>
      );
    }
    return (
      <Text
        style={[
          Styles.screenFirstNumber,
          { fontSize: firstNumber.length > 7 ? 50 : 100 },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {firstNumber}
      </Text>
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
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {" "}
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
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
