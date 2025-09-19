import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  // logica

  // tamaño del height
  // cuando cambia el tamaño se actualiza los demas
  const { height } = useWindowDimensions();
  // console.log(height)

  // renderizado
  return (
    // KeyboardAvoidingView : para q cuando aparezca el teclado mi vista se acomede su altura
    // si sale error poner en el > app\_layout.tsx -- padre envolverlo con GestureHandlerRootView
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {/* para q haga scrool */}
      <ScrollView style={{ paddingHorizontal: 40 }}>
        {/* vista encabezado */}
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>
        {/* vista para inputs (email y password)*/}
        <View style={{marginTop:20}}>
          <ThemedTextInput 
          placeholder="Correo Electrónico"
          keyboardType="email-address" //tipo de input
          autoCapitalize="none"
          icon="mail-outline"
          />
          <ThemedTextInput 
          placeholder="Contraseña"
          secureTextEntry //campos ocultos
          autoCapitalize="none"
          icon="lock-closed-outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
