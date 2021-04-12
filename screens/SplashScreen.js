import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";
import Colors from "../constants/Colors";

import FontsConstants from "../constants/FontsConstants";

const SplashScreen = (props) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timeout = setTimeout(() => {
      Animated.sequence([
        Animated.timing(moveAnim, {
          duration: 1500,
          toValue: Dimensions.get("window").width / 1.6,
          delay: 1,
          useNativeDriver: false,
        }),
        Animated.timing(moveAnim, {
          duration: 1500,
          toValue: 0,
          delay: 0,
          useNativeDriver: false,
        }),
      ]).start(() => props.navigation.navigate("onBoarding"));

      Animated.timing(fadeAnim, {
        duration: 1000,
        toValue: 1,
        delay: 2000,
        useNativeDriver: false,
      }).start();
    });
    return () => clearTimeout(timeout);
  }, [moveAnim, fadeAnim]);

  return (
    <Animated.View style={[styles.container]}>
      <Animated.View style={{ marginLeft: moveAnim }}>
        <Animated.Image
          style={{ ...styles.imageStyle, opacity: fadeAnim }}
          source={require("../assets/icon.jpg")}
        />
        <Animated.View style={{ marginBottom: moveAnim, flexDirection: "row" }}>
          <Animated.Text style={styles.text}>F</Animated.Text>
          <Animated.Text style={{ ...styles.text, opacity: fadeAnim }}>
            lic Lite
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: FontsConstants.PRO_SANS_BOLD,
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 1000,
    alignSelf: "center",
  },
});
