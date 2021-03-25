import React, { useRef } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Animated, { multiply, divide } from "react-native-reanimated";
import {
  useValue,
  onScrollEvent,
  interpolateColor,
  useScrollHandler,
} from "react-native-redash/lib/module/v1";

import SlideData from "../data/SlideData";
import SlideItem from "../components/SlideItem";
import SubSlide from "../components/SubSlide";

const { width } = Dimensions.get("window");
const OnBoardingScreen = (props) => {
  const scroll = useRef(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: SlideData.map((_, i) => i * width),
    outputRange: SlideData.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={{ backgroundColor: backgroundColor }}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          {...scrollHandler}
        >
          {SlideData.map((slide, index) => (
            <SlideItem
              title={slide.title}
              description={slide.description}
              key={index}
              lottiePath={slide.image}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <Animated.View
        style={{
          flexDirection: "row",
          width: width * SlideData.length,
          transform: [{ translateX: multiply(x, -1) }],
          backgroundColor: backgroundColor,
        }}
      >
        {SlideData.map((slide, index) => (
          <SubSlide
            title={slide.title}
            description={slide.description}
            key={index}
            last={index == SlideData.length - 1}
            onPress={() => {
              if (scroll.current) {
                scroll.current
                  .getNode()
                  .scrollTo({ x: width * (index + 1), animated: true });
              }
            }}
          />
        ))}
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: backgroundColor,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
  },
});

export default OnBoardingScreen;
