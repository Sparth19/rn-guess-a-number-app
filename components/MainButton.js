import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
      <View style={{ ...styles.btnStyle, ...props.style }}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.primary,
    paddingVertical:15,
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
