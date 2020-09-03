import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {

let imageStyle=styles.imageContainer;
if (Dimensions.get("window").height > 550) {
  imageStyle = styles.imageLargeContainer;
} else {
  imageStyle = styles.imageSmallContainer;
}
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Game Over !</TitleText>
        <View style={imageStyle}>
          <Image
            source={require("../assets/image2.png")}
            // source={{
            //   uri:
            //     "https://blog.vladvisors.com/hs-fs/hubfs/success%202.png?width=700&height=350&name=success%202.png",
            // }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.summary}>
          <TitleText style={styles.bodytext}>
            Your mobile needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> try to
            Guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
          </TitleText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical:30
  },
  title: {
    fontSize: Dimensions.get("window").width > 350 ? 23 : 18,
  },
  image: {
    height: "100%",
    width: "100%",
  },

  imageContainer: {
    // width: 300,
    // height: 300,
    width: Dimensions.get("window").height * 0.4,
    height: Dimensions.get("window").height * 0.4,
    borderRadius: 50,
    overflow: "hidden",
    // marginVertical: 20,
    marginVertical: Dimensions.get("window").height / 30,
  },
  imageSmallContainer: {
    width: Dimensions.get("window").height * 0.4,
    height: Dimensions.get("window").height * 0.4,
    borderRadius: 50,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  imageLargeContainer: {
    width: Dimensions.get("window").height * 0.3,
    height: Dimensions.get("window").height * 0.3,
    borderRadius: 50,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  highlight: {
    color: Colors.primary,
    fontSize: Dimensions.get("window").width > 350 ? 22 : 18,
  },
  summary: {
    marginHorizontal: Dimensions.get("window").width / 10,
    marginVertical: Dimensions.get("window").width / 50,

  },
  bodytext: {
    textAlign: "center",
    fontSize: Dimensions.get("window").width > 350 ? 20 : 14,
  },
});

export default GameOverScreen;
