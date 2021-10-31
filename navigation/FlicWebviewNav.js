import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import OnBoardingScreen from "../screens/OnBoardingScreen";
import HafrikMainScreen from "../screens/HafrikMainScreen";
import SplashScreen from "../screens/SplashScreen";

const FlicWebViewNavigator = createStackNavigator(
  {
    splashScreen:SplashScreen,
    onBoarding:OnBoardingScreen,
    mainScreen: HafrikMainScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
export default createAppContainer(FlicWebViewNavigator);
