import AsyncStorage from "@react-native-async-storage/async-storage";

const HAS_LAUNCHED = "has launched";

const setAppLaunched = () => {
  AsyncStorage.setItem(HAS_LAUNCHED, "true");
};

export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
