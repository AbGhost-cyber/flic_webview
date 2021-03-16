import React from "react";
import { StyleSheet, Text, Animated } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const AnimatedElement = (props) => {
  return (
    <AnimatedLoader
      visible={props.visible}
      overlayColor={props.color}
      source={props.lottiePath}
      animationStyle={props.style}
      speed={1}
    >
      <Animated.View style={{ opacity: props.fadeAnim }}>
       {props.children}
      </Animated.View>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({});

export default AnimatedElement;
