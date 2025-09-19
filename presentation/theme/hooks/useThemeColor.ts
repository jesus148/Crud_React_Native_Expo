/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

// hook que decide qué color usar según el tema


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {

  // hook nativo de React Native que devuelve el modo del dispositivo
  // ?? : si es null devuelve light
  const theme = useColorScheme() ?? 'light';


  // console.log(props)
  // buscando en el objeto props dependiendo del tema
  const colorFromProps = props[theme];

  // Si el componente pidió un color a mano, se usa ese.
  if (colorFromProps) {
    // console.log(colorFromProps)
    return colorFromProps;

    // Si no, se usa el color por defecto del tema definido en Colors
  } else {
    return Colors[theme][colorName];
  }
}