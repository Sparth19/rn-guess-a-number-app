import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/colors";

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS == "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress} activeOpacity={0.8}>
        <View style={{ ...styles.btnStyle, ...props.style }}>
          <Text style={styles.text}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  btnStyle: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    //  marginHorizontal: 10,
    borderRadius: 25,
    // marginVertical: 15,
  },
  text: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
});

export default MainButton;
