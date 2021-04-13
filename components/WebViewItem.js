import React from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";

import TextConstants from "../constants/TextConstants";
import Colors from "../constants/Colors";

const WebViewItem = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <WebView
        style={{ flex: 1 }}
        source={{ uri: TextConstants.FLIC_URL }}
        javaScriptEnabled={true}
        //enable cache
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
};

export default WebViewItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
