import React, { useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, { multiply, divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash/lib/module/v1";

import SlideData from "../data/SlideData";
import SlideItem from "../components/SlideItem";
import SubSlide from "../components/SubSlide";
import Dots from "../components/Dots";

const { width, height } = Dimensions.get("window");

const OnBoardingScreen = (props) => {
  const scroll = useRef(null);
  const { scrollHandler, x } = useScrollHandler();

  return (
    <View style={styles.container}>
      <Animated.View style={styles.slider}>
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
            <SlideItem key={index} index={index} picture={slide.image} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={styles.subFooter} />
        <View style={styles.footerContainer}>
          <Animated.View
            style={{
              flexDirection: "row",
              width: width * SlideData.length,
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {SlideData.map((slide, index) => (
              <SubSlide
                title={slide.title}
                description={slide.description}
                key={index}
                last={index == SlideData.length - 1}
                onPress={() => {
                  if (scroll.current && !(index == SlideData.length - 1)) {
                    scroll.current
                      .getNode()
                      .scrollTo({ x: width * (index + 1), animated: true });
                  } else {
                    //navigate to main screen
                    props.navigation.navigate({
                      routeName: "mainScreen",
                    });
                  }
                }}
              />
            ))}
          </Animated.View>
          <View style={styles.pagination}>
            {SlideData.map((_, index) => (
              <Dots index={index} currentIndex={divide(x, width)} key={index} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    elevation: 8,
    flex: 1,
    paddingVertical: 40,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  slider: {
    height: height / 2,
  },
  subFooter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    borderTopRightRadius: 46,
    borderTopLeftRadius: 46,
  },
  pagination: {
    //...StyleSheet.absoluteFillObject,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default OnBoardingScreen;
