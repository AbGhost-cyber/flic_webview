import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FontsConstants from "../constants/FontsConstants";
import Button from "../components/Button";

const SubSlide = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.desc}>{props.description}</Text>
      <Button
        text={props.last ? "Let's get started" : "Next"}
        textStyle={{
          fontFamily: FontsConstants.PRO_SANS_BOLD,
          color: props.last ? "white" : "black",
          fontSize: 15,
          textAlign: "center",
        }}
        buttonStyle={{
          backgroundColor: props.last ? "black" : "white",
          width: 245,
          height: 50,
          marginTop: 20,
          borderColor: props.last ? "white" : "black",
          borderWidth: 1,
        }}
        onPress={props.onPress}
      />
    </View>
  );
};

export default SubSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 44,
  },
  title: {
    color: "white",
    fontFamily: FontsConstants.PRO_SANS_BOLD,
    fontSize: 26,
    textAlign: "center",
  },
  desc: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontFamily: FontsConstants.PRO_SANS,
  },
});
