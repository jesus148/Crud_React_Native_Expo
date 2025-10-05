import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColor'

// COMPONENTE BOTON


// clase modelo
interface Props extends PressableProps{
    icon?: keyof typeof Ionicons.glyphMap, 
    children?:string //recordar es el contenido dentro
}


const ThemedButton = ({children, icon, ...rest}:Props) => {
    // logica

    // determina color
    const primaryColor = useThemeColor({}, 'primary');



    // renderizado
  return (
    <Pressable 
    // {pressed} : si esta presionado pone esto primaryColor + '90'
    style={({pressed})=>[
        {
            //  primaryColor + '90' : hexadecimal color + 90 q es el opacity
            backgroundColor:pressed ? primaryColor + '90' : primaryColor
        }, 
        styles.button
    ]}
    // resto de funciones del elemento
    {...rest}
    >
        {/* texto */}
        <Text style={{color:'white'}}>{children}</Text>
    {/* si existe iconos */}
    {
        icon && (
            <Ionicons 
            name={icon}
            color="white"
            size={24}
            style={{marginHorizontal:5}}
            />
        )
    }
    </Pressable>
  )
}

export default ThemedButton;


// estilos
const styles = StyleSheet.create({
    button:{
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:5, 
        alignItems:'center', 
        flexDirection:'row', 
        justifyContent:'center'
    }
})