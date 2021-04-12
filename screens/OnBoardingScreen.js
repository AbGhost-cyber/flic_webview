import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, { multiply, divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash/lib/module/v1";
import { StatusBar } from "expo-status-bar";

import SlideData from "../data/SlideData";
import SlideItem from "../components/SlideItem";
import SubSlide from "../components/SubSlide";
import Dots from "../components/Dots";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OnBoardingScreen = (props) => {
  const scroll = useRef(null);
  const { scrollHandler, x } = useScrollHandler();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.clear();
        if (value || isDone) {
          props.navigation.replace("mainScreen");
        }
      } catch (error) {}
    };
    retrieveData();
  }, [isDone]);

  const onDone = useCallback(async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    setIsDone(true);
  }, []);

  return (
    <View style={styles.container}>
    <StatusBar/>
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
                  if (scroll.current && !(index === SlideData.length - 1)) {
                    scroll.current
                      .getNode()
                      .scrollTo({ x: width * (index + 1), animated: true });
                  } else if (index === SlideData.length - 1) {
                    onDone();
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
