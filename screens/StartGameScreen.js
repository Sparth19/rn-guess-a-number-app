import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
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
  const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 3.2);


  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 3.2);
    };
  
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });
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
    <ScrollView>
      <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={30}>
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
                <View style={{width: buttonWidth}}>
                  <MainButton
                    style={{ ...styles.reset }}
                    onPress={resetInputHandler}
                  >
                    <Text style={{ color: "red" }}>Reset</Text>
                  </MainButton>
                </View>
                <View style={{width: buttonWidth}}>
                  <MainButton
                    style={{ ...styles.confirm }}
                    onPress={confirmInputHandler}
                  >
                    <Text style={{ color: "green" }}>Confirm</Text>
                  </MainButton>
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    // width: 300,
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    // maxWidth: "80%",
    alignItems: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  // btn: {
  //   width: Dimensions.get("window").width / 3.5, //window excludes status bar in android
  // },
  reset: {
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal:0
  },
  confirm: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal:0

  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default StartGameScreen;
