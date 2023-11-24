import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";


export default function App() {

  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>

      <Navigation colorScheme={colorScheme} /> 
      <StatusBar /> 

    </SafeAreaProvider>
  );

};
