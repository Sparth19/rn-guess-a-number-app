import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

//fonts
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [currenNumber, setCurrentNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGame = () => {
    setRounds(0);
    setCurrentNumber(null);
  };
  const startGameHandler = (selectedNumber) => {
    setCurrentNumber(selectedNumber);
  };

  const gameOverHandler = (rounds) => {
    setRounds(rounds);
  };
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (currenNumber && rounds <= 0) {
    content = (
      <GameScreen userChoice={currenNumber} onGameOver={gameOverHandler} />
    );
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={rounds}
        userNumber={currenNumber}
        onRestart={configureNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
