import { View, Text } from 'react-native'
import React from 'react'
import AwesomeButton from 'react-native-really-awesome-button';

export default function CustomButton(props) {
    const {
        onPress,
        backgroundColor,
        backgroundDarker,
        textColor,
        borderColor,
        borderWidth,
        borderRadius,
        height,
        width,
        children,
      } = props;
    
  return (
    <AwesomeButton
    onPress={onPress}
    backgroundColor={backgroundColor}
    backgroundDarker={backgroundDarker}
    textColor={textColor}
    borderColor={borderColor}
    borderWidth={borderWidth}
    borderRadius={borderRadius}
    height={height}
    width={width}
  >
    {children}
  </AwesomeButton>
  )
}