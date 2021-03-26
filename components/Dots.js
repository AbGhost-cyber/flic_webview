import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";

const Dots = (props) => {
  const { index, currentIndex } = props;
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{ ...styles.dots, transform: [{ scale }], opacity: opacity }}
    ></Animated.View>
  );
};

export default Dots;

const styles = StyleSheet.create({
  dots: {
    backgroundColor: "white",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
});
