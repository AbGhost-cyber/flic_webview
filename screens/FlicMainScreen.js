import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";

import WebViewItem from "../components/WebViewItem";
import TextConstants from "../constants/TextConstants";
import AnimatedElement from "../components/Animated";
import CustomButton from "../components/Button";
import Colors from "../constants/Colors";
import FontsConstants from "../constants/FontsConstants";

const FlicMainScreen = (props) => {
  const [fakeWebIsLoaded, setFakeWebIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [conError, setConError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [webViewKey, setWebViewKey] = useState(0);

  const fadeOut = () => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ).start();
  };

  if (conError) {
    return (
      <SafeAreaView style={styles.errorParent}>
      <StatusBar/>
        <AnimatedElement
          color={Colors.lottieBg}
          lottiePath={require("../no-internet-connection-empty-state.json")}
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
  
  if (fakeWebIsLoaded) {
    return <WebViewItem />;
  }

 

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: 0, height:0}}>
        <WebView
          key={webViewKey}
          source={{ uri: TextConstants.FLIC_URL }}
          onLoad={() => {
            setFakeWebIsLoaded(true);
            setVisible(false);
            setConError(false);
          }}
          onLoadStart={() => {
            setVisible(true);
            fadeOut();
          }}
          onError={() => {
            setConError(true);
            setVisible(false);
          }}
          // renderError={() => {
          //   setConError(true);
          //   setVisible(false);
          // }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
      {visible ? (
        <AnimatedElement
          color={Colors.lottieBg}
          fadeAnim={fadeAnim}
          lottiePath={require("../loader.json")}
          visible={visible}
          style={styles.lottie}
        >
          <Text style={styles.textStyle}>{TextConstants.LOADING_TEXT}</Text>
        </AnimatedElement>
      ) : null}
    </SafeAreaView>
  );
};

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
    flexGrow:1,
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
    color: "black",
    alignItems: "center",
  },
});
export default FlicMainScreen;
