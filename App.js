import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { Text } from "react-native";

import FlicWebviewNav from "./navigation/FlicWebviewNav";
import checkIfFirstLaunch from "./navigation/checkLaunch";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import FlicMainScreen from "./screens/FlicMainScreen";

enableScreens(true);

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [hasCheckedAsyncStorage, setHasCheckedAsyncStorage] = useState(false);

  useEffect(() => {
    async function setAsyncData() {
      const isFirstLaunch = await checkIfFirstLaunch();
      setIsFirstLaunch(isFirstLaunch);
      setHasCheckedAsyncStorage(true);
    }
    setAsyncData();
  }, [isFirstLaunch, hasCheckedAsyncStorage]);

  const fetchFonts = () => {
    return Font.loadAsync({
      "product-sans-bold": require("./assets/fonts/ProductSans-Bold.ttf"),
      "product-sans": require("./assets/fonts/ProductSans-Regular.ttf"),
    });
  };

  if (!fontIsLoaded || !hasCheckedAsyncStorage) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
        onError={console.warn}
      />
    );
  }
  if (showHomeScreen) {
    return <FlicWebviewNav />;
  }

  return isFirstLaunch ? (
    <OnBoardingScreen showMainScreen={() => setShowHomeScreen(true)} />
  ) : (
    <FlicWebviewNav />
  );
}
