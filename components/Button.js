import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{ ...styles.parent, ...props.buttonStyle }}
    >
      <View>
        <Text style={{ ...props.textStyle }}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  parent: {
    elevation: 3,
    borderRadius: 5,
    padding: 15,
  },
});

export default CustomButton;
