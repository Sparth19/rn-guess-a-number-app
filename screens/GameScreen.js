import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import {Ionicons} from '@expo/vector-icons'
import MainButton from "../components/MainButton";
const randomNumberGenerator = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;

  if (rndNumber === exclude) {
    return randomNumberGenerator(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    randomNumberGenerator(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (userChoice === currentGuess) {
      onGameOver(rounds);
    }
  },[currentGuess,userChoice,onGameOver]); //useEffect will run whenever this three value changes

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie", "You know thats wrong", [{ text: "Sorry!" }]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextGuess = randomNumberGenerator(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    setRounds((curRounds) => curRounds + 1 );
  };

  return (
    <View style={styles.screen}>
      <TitleText>Opponents's guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")} >
          <Ionicons name='md-remove' size={24}/>
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")} >
          <Ionicons name='md-add' size={24}/>
        </MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
export default GameScreen;
