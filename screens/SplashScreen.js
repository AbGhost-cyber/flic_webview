import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated
} from "react-native";
import AnimatedSplash from "react-native-animated-splash-screen";

import Colors from "../constants/Colors";
import FontsConstants from "../constants/FontsConstants";

const SplashItem = ({ navigation }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timeout = setTimeout(() => {
      Animated.sequence([
        Animated.timing(moveAnim, {
          duration: 1000,
          toValue: Dimensions.get("window").width / 1.6,
          delay: 1,
          useNativeDriver: false,
        }),
        Animated.timing(moveAnim, {
          duration: 1400,
          toValue: 0,
          delay: 0,
          useNativeDriver: false,
        }),
      ]).start(() => navigation.navigate("onBoarding"));

      Animated.timing(fadeAnim, {
        duration: 1000,
        toValue: 1,
        delay: 1000,
        useNativeDriver: false,
      }).start();
    });
    return () => clearTimeout(timeout);
  }, [moveAnim, fadeAnim]);

  return (
    <Animated.View style={[styles.container]}>
      <Animated.View style={{ padding: moveAnim }}>
        <Animated.Image
          style={{ ...styles.imageStyle, opacity: fadeAnim}}
          source={require("../assets/icon.png")}
        />
        <Animated.View style={{ flexDirection: "row"}}>
          <Animated.Text style={{ ...styles.text, opacity: fadeAnim }}>
            Flic Lite
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};
const SplashScreen = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoaded]);

  return (
    <AnimatedSplash
      backgroundColor={Colors.colorPrimary}
      isLoaded={isLoaded}
      preload={false}
      customComponent={<SplashItem navigation={navigation} />}
    />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
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
