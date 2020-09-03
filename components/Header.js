import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: "black",
  },
});

export default Header;
