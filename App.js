import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import AnimatedLoader from "react-native-animated-loader";

export default function App() {
  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   setInterval(() => {
  //     setVisible((prevState) => !prevState);
  //   }, 2000);
  // });
  const ActivityIndicatorElement = () => {
    return (
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text>Hang in there...</Text>
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
        onLoadStart={() => setVisible(true)}
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
