import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';

// clase  modelo
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};


// COMPONENTE PARA MOSTRAR ESTILOS PARA LA VISTA

export function ThemedText({
  // props
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest //props del textprops extras
}: ThemedTextProps) {


  // hook para decidir el color del tema
  // const color = useThemeColor({ light: 'red', dark: darkColor }, 'text');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  // console.log(color)

  return (
    <Text
      style={[
        { color }, //aplica el color dinámico según tema.
        // props type segun eso
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        // estilo propio
        style,
      ]}
      // renderizado
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'KanitBold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});