import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

// COMPONENTE PARA INPUTS

// clase modelo
interface Props extends TextInputProps{
    icon?: keyof typeof Ionicons.glyphMap
}


// componente inputs Personalizado


const ThemedTextInput = ({icon,...rest}:Props) => {
    // logica

    // color cambiar focus
    const primaryColor = useThemeColor({},'primary');
    // color para texto
    const textColor = useThemeColor({},'text');

    // para el focus inputs
    const [isActive, setIsActive] = useState(false);

    // guarda renderezidos
    const inputRef = useRef<TextInput>(null);

    // renderizado
  return (
    <View style={{
      // estilos  , trae todo esto
      ...styles.border, 
    // y lo junta con esto
      //si esta activo el focus cambia color y si se desenfoca tambien
      borderColor:isActive ? primaryColor:'#ccc'
    }}
    //cuando el usuario toca el view , pone el focus
    onTouchStart={()=>{
      inputRef.current?.focus()
    }}
    >

      {/* si existe props icon */}
      {
        icon && (
          <Ionicons 
          name={icon}
          size={24}
          color={textColor}
          style={{marginRight:10}}
          />
        )
      }

      {/* {...rest} : todos los props menos el icon */}
      <TextInput 
      ref={inputRef} //cambia el valor del ref para el focus
      placeholderTextColor='#5c5c5c'
      onFocus={()=> setIsActive(true)}//es activo el focus
      onBlur={()=>setIsActive(false)} //esta afuera el focus
      style={{
        color:textColor, 
        marginRight:10, 
        flex:1
      }}
      {...rest} />
    </View>
  )
}

export default ThemedTextInput;

// estilos
const styles = StyleSheet.create({
  border:{
    borderWidth:1,
    borderRadius:5, 
    padding:5, 
    marginBottom:10,
    flexDirection:'row', 
    alignItems:'center',
    flex:1
  }
})