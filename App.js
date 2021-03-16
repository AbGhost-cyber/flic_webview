import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Animated } from "react-native";
import { WebView } from "react-native-webview";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AnimatedElement from "./components/Animated";
import CustomButton from "./components/Button";
import FontsConstants from "./constants/FontsConstants";
import TextConstants from "./constants/TextConstants";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const [conError, setConError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const webViewRef = useRef();

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
          color="rgba(255,255,255,0.75)"
          lottiePath={require("./no-internet-connection-empty-state.json")}
          visible={conError}
          style={{ height: 200 }}
        >
          <Text style={styles.title}>{TextConstants.NO_INTERNET_TITLE}</Text>
          <Text style={styles.desc}>{TextConstants.NO_INTERNET_DESC}</Text>
          <CustomButton
            text={TextConstants.RETRY}
            onPress={() => webViewRef.reload}
            textStyle={{ ...styles.textStyle, color: "white" }}
            buttonStyle={{ backgroundColor: "red", marginTop: 20 }}
          />
        </AnimatedElement>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={(ref) => (webViewRef.current = ref)}
        onError={() => {
          setConError(true);
          setVisible(false);
        }}
        style={{ flex: 1 }}
        source={{ uri: "https://flic.xyz/" }}
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
          color="rgba(255,255,255,0.75)"
          fadeAnim={fadeAnim}
          lottiePath={require("./loader.json")}
          visible={visible}
          style={styles.lottie}
        >
          <Text style={styles.textStyle}>"Swapping time and space...👩🏿‍💻"</Text>
        </AnimatedElement>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  errorParent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: FontsConstants.PRO_SANS,
    textAlign: "center",
  },
  desc: {
    fontFamily: "product-sans",
    fontSize: 19,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: FontsConstants.PRO_SANS,
    textAlign: "center",
    fontSize: 27,
    alignItems: "center",
  },
});
