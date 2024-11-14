// import * as React from "react";
// import ButtonComponent from "./Button";
// import { View, Text, Button } from "react-native";
// import { Styles } from "../styles/GlobalStyles";
// import { myColors } from "../styles/Colors";
// import { Ionicons } from "react-native-vector-icons";

// export default function MyKeyboard() {
//   const [firstNumber, setFirstNumber] = React.useState("");
//   const [secondNumber, setSecondNumber] = React.useState("");
//   const [operation, setOperation] = React.useState("");
//   const [result, setResult] = React.useState(null);

//   const handleNumberPress = (buttonValue) => {
//     if (firstNumber.length < 10) {
//       setFirstNumber(firstNumber + buttonValue); // Sayıyı doğru ekliyor mu?
//       console.log(`First Number: ${firstNumber}`); // Debugging
//     }
//   };
//   const handleOperationPress = (buttonValue) => {
//     console.log(`Pressed Operation: ${buttonValue}`); // Debugging

//     if (buttonValue === "+/-") {
//       setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
//     } else {
//       setOperation(buttonValue);
//       setSecondNumber(firstNumber); // İlk sayıyı alıyoruz
//       setFirstNumber(""); // İkinci sayıyı girmeye başlıyoruz
//     }
//   };
//   const clear = () => {
//     setOperation("");
//     setSecondNumber("");
//     setFirstNumber("");
//     setResult(null);
//   };

//   // const getResult = () => {
//   //   switch (operation) {
//   //     case "+":
//   //       clear();
//   //       setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
//   //       break;
//   //     case "-":
//   //       clear();
//   //       setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
//   //       break;
//   //     case "*":
//   //       clear();
//   //       setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
//   //       break;
//   //     case "/":
//   //       clear();
//   //       setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
//   //       break;
//   //     default:
//   //       // setResult(0);
//   //       setResult(firstNumber);
//   //       break;
//   //   }
//   //   clear();
//   // };

//   const getResult = () => {
//     let calculatedResult;
//     switch (operation) {
//       case "+":
//         calculatedResult = parseFloat(secondNumber) + parseFloat(firstNumber);
//         break;
//       case "-":
//         calculatedResult = parseFloat(secondNumber) - parseFloat(firstNumber);
//         break;
//       case "*":
//         calculatedResult = parseFloat(secondNumber) * parseFloat(firstNumber);
//         break;
//       case "/":
//         if (firstNumber !== "0") {
//           calculatedResult = parseFloat(secondNumber) / parseFloat(firstNumber);
//         } else {
//           calculatedResult = "Error"; // Bölme hatası (sıfıra bölme)
//         }
//         break;
//       default:
//         calculatedResult = firstNumber; // Eğer işlem yoksa sadece firstNumber
//         break;
//     }

//     setResult(calculatedResult); // Sonucu ayarlıyoruz
//     clear(); // Sonraki işlem için sıfırlıyoruz
//   };

//   const firstNumberDisplay = () => {
//     if (result !== null) {
//       return (
//         <Text
//           style={[
//             Styles.screenFirstNumber,
//             { color: myColors.result, fontSize: result < 99999 ? 50 : 40 },
//           ]}
//         >
//           {result?.toString()}
//         </Text>
//       );
//     }

//     const numberLength = firstNumber.length;

//     if (firstNumber === "") {
//       return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
//     }

//     return (
//       <Text
//         style={[
//           Styles.screenFirstNumber,
//           { fontSize: numberLength > 7 ? 50 : numberLength > 5 ? 70 : 100 },
//         ]}
//       >
//         {firstNumber}
//       </Text>
//     );
//   };

//   return (
//     <View style={Styles.viewBottom}>
//       <View
//         style={{
//           height: 120,
//           width: "90%",
//           justifyContent: "flex-end",
//           alignSelf: "center",
//         }}
//       >
//         <Text style={Styles.screenSecondNumber}>
//           {secondNumber}
//           <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
//             {" "}
//             {operation}
//           </Text>
//         </Text>
//         {firstNumberDisplay()}
//       </View>

//       <View style={Styles.row}>
//         <ButtonComponent title="C" isGray onPress={clear} />
//         <ButtonComponent
//           title="+/-"
//           isGray
//           onPress={() => handleOperationPress("+/-")}
//         />
//         <ButtonComponent
//           title="%"
//           isGray
//           onPress={() => handleOperationPress("%")}
//         />
//         <ButtonComponent
//           title="/"
//           isBlue
//           onPress={() => handleOperationPress("/")}
//         />
//       </View>
//       <View style={Styles.row}>
//         <ButtonComponent title="7" onPress={() => handleNumberPress("7")} />
//         <ButtonComponent title="8" onPress={() => handleNumberPress("8")} />
//         <ButtonComponent title="9" onPress={() => handleNumberPress("9")} />
//         <ButtonComponent
//           title="x"
//           isBlue
//           onPress={() => handleOperationPress("*")}
//         />
//       </View>
//       <View style={Styles.row}>
//         <ButtonComponent title="4" onPress={() => handleNumberPress("4")} />
//         <ButtonComponent title="5" onPress={() => handleNumberPress("5")} />
//         <ButtonComponent title="6" onPress={() => handleNumberPress("6")} />
//         <ButtonComponent
//           title="-"
//           isBlue
//           onPress={() => handleOperationPress("-")}
//         />
//       </View>
//       <View style={Styles.row}>
//         <ButtonComponent title="1" onPress={() => handleNumberPress("1")} />
//         <ButtonComponent title="2" onPress={() => handleNumberPress("2")} />
//         <ButtonComponent title="3" onPress={() => handleNumberPress("3")} />
//         <ButtonComponent
//           title="+"
//           isBlue
//           onPress={() => handleOperationPress("+")}
//         />
//       </View>
//       <View style={Styles.row}>
//         <ButtonComponent title="." onPress={() => handleNumberPress(".")} />
//         <ButtonComponent title="0" onPress={() => handleNumberPress("0")} />
//         <ButtonComponent
//           title="<"
//           onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
//         />
//         <ButtonComponent title="=" isBlue onPress={() => getResult()} />
//       </View>
//     </View>
//   );
// }
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
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue); // Sayıyı doğru ekliyor mu?
      console.log(`First Number: ${firstNumber}`); // Debugging
    }
  };

  const handleOperationPress = (buttonValue) => {
    console.log(`Pressed Operation: ${buttonValue}`); // Debugging

    if (buttonValue === "+/-") {
      setFirstNumber((prev) => (parseFloat(prev) * -1).toString());
    } else if (buttonValue === "%") {
      setFirstNumber((prev) => (parseFloat(prev) / 100).toString());
    } else {
      setOperation(buttonValue);
      setSecondNumber(firstNumber); // İlk sayıyı alıyoruz
      setFirstNumber(""); // İkinci sayıyı girmeye başlıyoruz
    }
  };

  const clear = () => {
    setOperation("");
    setSecondNumber("");
    setFirstNumber("");
    setResult(null);
  };

  const getResult = () => {
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
          calculatedResult = "Error"; // Bölme hatası (sıfıra bölme)
        } else {
          calculatedResult = parseFloat(secondNumber) / parseFloat(firstNumber);
        }
        break;
      default:
        calculatedResult = firstNumber; // Eğer işlem yoksa sadece firstNumber
        break;
    }

    setResult(calculatedResult); // Sonucu ayarlıyoruz
    setFirstNumber(calculatedResult.toString()); // Sonucu ilk sayıya ekliyoruz
    setSecondNumber(""); // İkinci sayıyı sıfırlıyoruz
    setOperation(""); // İşlemi sıfırlıyoruz
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={[
            Styles.screenFirstNumber,
            { color: myColors.result, fontSize: result < 99999 ? 50 : 40 },
          ]}
        >
          {result?.toString()}
        </Text>
      );
    }

    const numberLength = firstNumber.length;

    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }

    return (
      <Text
        style={[
          Styles.screenFirstNumber,
          { fontSize: numberLength > 7 ? 50 : numberLength > 5 ? 70 : 100 },
        ]}
      >
        {firstNumber}
      </Text>
    );
  };

  return (
    <View style={Styles.viewBottom}>
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
          title="/"
          isBlue
          onPress={() => handleOperationPress("/")}
        />
      </View>
      <View style={Styles.row}>
        <ButtonComponent title="7" onPress={() => handleNumberPress("7")} />
        <ButtonComponent title="8" onPress={() => handleNumberPress("8")} />
        <ButtonComponent title="9" onPress={() => handleNumberPress("9")} />
        <ButtonComponent
          title="x"
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
        <ButtonComponent
          title="<"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <ButtonComponent title="=" isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
}
