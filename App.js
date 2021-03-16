import React, { useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Animated } from "react-native";
import { WebView } from "react-native-webview";
import AnimatedLoader from "react-native-animated-loader";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchFonts = () => {
    return Font.loadAsync({
      "product-sans-bold": require("./assets/fonts/ProductSans-Bold.ttf"),
    });
  };

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const fadeOut = () => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  };

  const ActivityIndicatorElement = () => {
    return (
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text
            style={{ fontFamily: "product-sans-bold", textAlign: "center" }}
          >
          Swapping time and space...👩🏿‍💻
          </Text>
        </Animated.View>
      </AnimatedLoader>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: "https://flic.xyz/" }}
        javaScriptEnabled={true}
        //enable cache
        domStorageEnabled={true}
        onLoadStart={() => {
          setVisible(true);
          fadeOut();
        }}
        onLoad={() => setVisible(false)}
      />
      {visible ? <ActivityIndicatorElement /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  // activityIndicator: {
  //   flex: 1,
  //   position: "absolute",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   marginTop: "auto",
  //   marginBottom: "auto",
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  lottie: {
    width: 100,
    height: 100,
  },
});
