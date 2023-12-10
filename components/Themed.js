// Learn more about Light and Dark modes:
// https://docs.expo.dev/guides/color-schemes/
import {Text as DefaultText, useColorScheme, View as DefaultView, Button as DefaultButton} from "react-native";

import Colors from "../constants/Colors";

export function useThemeColor(props, colorName) {

  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {

    return colorFromProps;

  } else {

    return Colors[theme][colorName];

  };

};


export function Text(props) {

  const { style, ...otherProps } = props;
  const color = 'black';

  return <DefaultText style={[{ color }, style]} {...otherProps} />;

};

export function View(props) {

  const { style, ...otherProps } = props;
  const backgroundColor = 'white';

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;

};


export function Button(props) {

  const { style, ...otherProps } = props;
  const backgroundColor = 'white';

  return <DefaultButton style={[{ backgroundColor }, style]} {...otherProps} />;

};
