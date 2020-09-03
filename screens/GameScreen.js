import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import { Ionicons } from "@expo/vector-icons";
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

const renderListItem = (value, noOfRound) => {
  return (
    <View key={value} style={styles.listItem}>
      <Text>#{noOfRound}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const initialguess = randomNumberGenerator(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialguess);
  const [pastGuesses, setPastGuesses] = useState([initialguess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (userChoice === currentGuess) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]); //useEffect will run whenever this three value changes

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
      currentLow.current = currentGuess + 1;
    }
    const nextGuess = randomNumberGenerator(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    //setRounds((curRounds) => curRounds + 1 );
    setPastGuesses((curPastGuesses) => [nextGuess, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <TitleText>Opponents's guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
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
  list: {
    flex: 1, //for android
    width: "80%",
  },
  listItem: {
    padding: 20,
    justifyContent: "space-between",
    flexDirection: 'row',
    borderWidth: 1,
    margin:5,
    borderColor: '#ccc',
  },
});
export default GameScreen;
