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
      <Image
        source={props.picture}
        style={{
          width: props.index === 1 ? width - 6 : width,
          height: 400,
          marginTop: 12,
        }}
      />
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  parent: {
    width: width,
    overflow: "hidden",
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
  },
  picture: {
    // ...StyleSheet.absoluteFillObject,
    // width: undefined,
    // height: undefined,
    width: width,
    height: 400,
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
