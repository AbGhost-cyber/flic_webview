import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import OnBoardingScreen from "../screens/OnBoardingScreen";
import FlicMainScreen from "../screens/FlicMainScreen";
import SplashScreen from "../screens/SplashScreen";

const FlicWebViewNavigator = createStackNavigator(
  {
    splashScreen:SplashScreen,
    onBoarding:OnBoardingScreen,
    mainScreen: FlicMainScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
export default createAppContainer(FlicWebViewNavigator);
