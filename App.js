import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import TopNavigator from "./navigation/TopNavigator";
import { useColorScheme } from "react-native";
// import style from './Index.module.css';

export default function App() {
  // const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  return (
    <SafeAreaProvider>
      <TopNavigator navigation={navigation} />
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
  // }
}
