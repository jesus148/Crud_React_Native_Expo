import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

// clase modelo
interface Props{
    onPress:()=> void;
    icon: keyof typeof Ionicons.glyphMap;
}

// Componente para la camara
const MenuIconButton = ({onPress , icon}:Props) => {
    // logica

    // hook decidir tema color
    const primaryColor = useThemeColor({},'primary');



    // renderizado
  return (
    // boton
    <TouchableOpacity onPress={onPress}>
        {/* icono */}
        <Ionicons  name={icon} size={24}  color={primaryColor}/>
    </TouchableOpacity>
  )
}

export default MenuIconButton