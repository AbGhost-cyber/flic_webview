import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Animated } from "react-native";
import { WebView } from "react-native-webview";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import AnimatedElement from "./components/Animated";
import CustomButton from "./components/Button";
import FontsConstants from "./constants/FontsConstants";
import TextConstants from "./constants/TextConstants";
import Colors from "./constants/Colors";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const [conError, setConError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [webViewKey, setWebViewKey] = useState(0);

  const fetchFonts = () => {
    return Font.loadAsync({
      "product-sans-bold": require("./assets/fonts/ProductSans-Bold.ttf"),
      "product-sans": require("./assets/fonts/ProductSans-Regular.ttf"),
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
        duration: 1900,
        useNativeDriver: true,
      })
    ).start();
  };

  if (conError) {
    return (
      <SafeAreaView style={styles.errorParent}>
        <AnimatedElement
          color={Colors.lottieBg}
          lottiePath={require("./no-internet-connection-empty-state.json")}
          visible={conError}
          style={{ height: 200 }}
        >
          <Text style={styles.title}>{TextConstants.NO_INTERNET_TITLE}</Text>
          <Text style={styles.desc}>{TextConstants.NO_INTERNET_DESC}</Text>
          <CustomButton
            text={TextConstants.RETRY}
            onPress={() => {
              setConError(false);
              setVisible(true);
              //reload the webpage
              setWebViewKey((prevState) => prevState + 1);
            }}
            textStyle={{ ...styles.textStyle, color: Colors.white }}
            buttonStyle={{ backgroundColor: Colors.red, marginTop: 20 }}
          />
        </AnimatedElement>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        key={webViewKey}
        onError={() => {
          setConError(true);
          setVisible(false);
        }}
        style={{ flex: 1 }}
        source={{ uri: TextConstants.FLIC_URL }}
        javaScriptEnabled={true}
        //enable cache
        domStorageEnabled={true}
        onLoadStart={() => {
          setVisible(true);
          fadeOut();
        }}
        onLoad={() => {
          setVisible(false);
          setConError(false);
        }}
      />
      {visible ? (
        <AnimatedElement
          color={Colors.lottieBg}
          fadeAnim={fadeAnim}
          lottiePath={require("./loader.json")}
          visible={visible}
          style={styles.lottie}
        >
          <Text style={styles.textStyle}>{TextConstants.LOADING_TEXT}</Text>
        </AnimatedElement>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  errorParent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  textStyle: {
    fontFamily: FontsConstants.PRO_SANS,
    textAlign: "center",
  },
  desc: {
    fontFamily: FontsConstants.PRO_SANS_BOLD,
    fontSize: 15,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: Colors.grey,
  },
  title: {
    fontFamily: FontsConstants.PRO_SANS_BOLD,
    textAlign: "center",
    fontSize: 27,
    alignItems: "center",
  },
});
