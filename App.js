import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { useColorScheme, setColorScheme } from "react-native";


export default function App() {

  const colorScheme = useColorScheme();

  // * Force light mode. 
  if (colorScheme === 'dark') {
    setColorScheme('light');
  };

  return (
    <SafeAreaProvider>

      <Navigation colorScheme={colorScheme} /> 
      <StatusBar /> 

    </SafeAreaProvider>
  );

};
