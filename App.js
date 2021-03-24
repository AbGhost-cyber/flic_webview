import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";

import FlicWebviewNav from "./navigation/FlicWebviewNav";

enableScreens(true);

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

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

  return <FlicWebviewNav />;
}
