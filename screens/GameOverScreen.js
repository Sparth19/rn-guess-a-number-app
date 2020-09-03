import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over !</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // source={require("../assets/image.png")}
          source={{
            uri:
              "https://blog.vladvisors.com/hs-fs/hubfs/success%202.png?width=700&height=350&name=success%202.png",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.summary}>
        <TitleText style={styles.bodytext}>
          Your mobile taken{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> try to
          Guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </TitleText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 50,
    overflow: "hidden",
    marginVertical: 20,
  },
  highlight: {
    color: Colors.primary,
    fontSize: 22,
  },
  summary: {
    marginHorizontal: 50,
  },
  bodytext: {
    textAlign: "center",
  },
});

export default GameOverScreen;
