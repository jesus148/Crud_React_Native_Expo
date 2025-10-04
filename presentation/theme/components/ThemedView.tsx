import { View, type ViewProps } from 'react-native';


import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';

// COMPONENTE PARA DETERMINAR EL TEMA OSEA LA VISTA

// clase modelo
// ViewProps props de view
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  // logica


  // hook para determinar color
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  // renderizado
  //  {...otherProps} : renderizado el chil o contenido y otros props
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}