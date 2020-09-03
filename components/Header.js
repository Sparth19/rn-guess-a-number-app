import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {


  return (
    <View style={{...styles.headerBase,...Platform.select(
      {ios:styles.headerIOS,
      android:styles.headerAndroid})}}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    // borderBottomColor: Platform.OS === "android" ? "white" : "#ccc",
    // borderBottomWidth: Platform.OS === "android" ? 0 : 1,
  },
  headerAndroid:{
    backgroundColor: Colors.primary

  },
  headerIOS:{
    backgroundColor:  "white",
    borderBottomColor:   "#ccc",
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default Header;
