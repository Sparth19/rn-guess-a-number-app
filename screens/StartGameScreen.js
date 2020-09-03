import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredValue);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert("Invalid Input", " Only Number between 0 to 99 allowed", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
    }
    setConfirmed(true);
    setSelectedNumber(choosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected </BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game !</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.textInput}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <MainButton style={styles.reset} onPress={resetInputHandler}>
              <Text style={{ color: "red" }}>RESET</Text>
            </MainButton>
            <MainButton style={styles.confirm} onPress={confirmInputHandler}>
              <Text style={{ color: "green" }}>CONFIRM</Text>
            </MainButton>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 20,
  },
  textInput: {
    width: 50,
    textAlign: "center",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  reset: {
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 2,
  },
  confirm: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    
  },
});
export default StartGameScreen;
