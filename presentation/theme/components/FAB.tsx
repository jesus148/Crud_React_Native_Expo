import { Ionicons } from '@expo/vector-icons';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

// clase modelo
interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}


// COMPONENTE DEL BOTON SUMA EN EL LISTADO 
// AL FINAL PARA CREAR UN PRODUCTO

export const FAB = ({ style, iconName, onPress }: Props) => {
  return (
    // boton cambia de color
    <TouchableOpacity
      style={[
        // estilos fijos
        {
          // se muestra primero ante todo
          zIndex:99,
          position: 'absolute',
          bottom: 30,
          right: 20,

          width: 60,
          height: 60,

          shadowColor: 'black',//color sombra
          backgroundColor: 'black',
        //   Determina cuánto se desplaza la sombra respecto al componente.
          shadowOffset: {
            width: 0,
            height: 10,
          },
        //   Controla la transparencia de la sombra.
          shadowOpacity: 0.4,
        //   Controla el difuminado de la sombra.
          shadowRadius: 10,
        //   Indica qué tan “elevado” está el elemento (como una capa sobre el fondo).
          elevation: 3,
          borderRadius: 13,

          alignItems: 'center',
          justifyContent: 'center',
        },
        // estilos de props
        style,
      ]}
    //   metodo funcion ejecuta
      onPress={onPress}
    >
        {/* icono */}
      <Ionicons name={iconName} size={30} color="white" />
    </TouchableOpacity>
  );
};