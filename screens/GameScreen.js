import React, { useState, useRef, useEffect, useDebugValue } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
//DEPRECATED SCREEN ORIENTATION FROm
//import {ScreenOrientation} from 'expo'

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

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};

const GameScreen = (props) => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrintationLock.PORTRAIT)
  const initialguess = randomNumberGenerator(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialguess);
  const [pastGuesses, setPastGuesses] = useState([initialguess.toString()]);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

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
    setPastGuesses((curPastGuesses) => [
      nextGuess.toString(),
      ...curPastGuesses,
    ]);
  };

  useEffect(() => {
    const updateLayout = () => {
      setScreenHeight(Dimensions.get("window").height);
      setScreenWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  if (screenHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponents's H guess</TitleText>
        <View style={styles.horizontalContainer}>
          <View style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} />
            </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>

            <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} />
            </MainButton>
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

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
      <View style={styles.listContainer}>
        {/* Important property for scrollview */}
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
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
    // marginTop: 20,
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },
  listContainer: {
    flex: 1, //for android
    //width: "60%",
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 5,
  },
  listItem: {
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    margin: 5,
    borderColor: "#ccc",
    width: "100%",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
});
export default GameScreen;
