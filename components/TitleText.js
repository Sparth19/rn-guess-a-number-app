import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.bodyText, ...props.style }}>{props.children}</Text>
  );
};
const styles = StyleSheet.create({
  bodyText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
export default TitleText;
