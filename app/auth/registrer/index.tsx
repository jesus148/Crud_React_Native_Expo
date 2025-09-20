import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";


// VISTA REGISTRO

const RegistrerScreen = () => {
  // logica

  // tamaño del height
  // cuando cambia el tamaño se actualiza los demas
  const { height } = useWindowDimensions();
  // console.log(height)

  // define el color
  const backgroundColor = useThemeColor({}, "background");

  // renderizado
  return (
    // KeyboardAvoidingView : para q cuando aparezca el teclado mi vista se acomede su altura
    // si sale error poner en el > app\_layout.tsx -- padre envolverlo con GestureHandlerRootView
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {/* para q haga scrool */}
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        {/* vista encabezado */}
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Crear Cuenta</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>
        {/* vista para inputs (email y password)*/}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre Completo"
            autoCapitalize="words" //capitaliza 1 letra
            icon="person-outline"
          />
          <ThemedTextInput
            placeholder="Correo Electronico"
            keyboardType="email-address" //teclado numerico
            autoCapitalize="none" //no autocapitalize
            icon="mail-outline"
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry //campos ocultos
            autoCapitalize="none" //no autocapitalize
            icon="lock-closed-outline"
          />
        </View>

        {/* espacio */}
        <View style={{ marginTop: 10 }} />

        {/* boton */}
        <ThemedButton icon="arrow-forward-circle-outline">
          {/* todo dentro de aca es children auto , actua como props */}
          Crear Cuenta
        </ThemedButton>

        {/* espacio */}
        <View style={{ marginTop: 40 }} />

        {/* enlace registro */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>¿ya tienes cuenta?</ThemedText>
          {/* redirige ahi > app\auth\login */}
          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
            {/* todo dentro de aca es children auto , actua como props */}
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrerScreen;
