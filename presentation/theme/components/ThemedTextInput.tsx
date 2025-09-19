import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInputProps, View } from 'react-native';

// clase modelo
interface Props extends TextInputProps{
    icon?: keyof typeof Ionicons.glyphMap
}


// componente inputs Personalizado


const ThemedTextInput = ({icon,...rest}:Props) => {
    // logica


    // renderizado
  return (
    <View>
      <Text>ThemedTextInput</Text>
    </View>
  )
}

export default ThemedTextInput