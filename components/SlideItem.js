import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import Animated from "react-native-reanimated";
import LottieAnimation from "lottie-react-native";

import Colors from "../constants/Colors";
import FontsConstants from "../constants/FontsConstants";

const { width, height } = Dimensions.get("window");

const SlideItem = (props) => {
  return (
    <View style={styles.parent}>
      <View style={styles.underlay}>
        <LottieAnimation
          source={props.lottiePath}
          loop={false}
          speed={1}
          style={{ width: width, marginTop: 20 }}
        />
      </View>
    
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  parent: {
    width: width,
    // height: height,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  underlay: {
    height: height * 6,
    justifyContent: "flex-start",
  },
});

// <View style={styles.underlay}>
// <AnimatedElement
//   color={Colors.lottieBg}
//   lottiePath={props.lottiePath}
//   visible
//   style={{ height: width }}
// />
// </View>
//<Text style={styles.desc}>{props.description}</Text>
//<Text style={styles.title}>{props.title}</Text>
