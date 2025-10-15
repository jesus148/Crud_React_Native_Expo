import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

// VISTA REGISTRO

const RegistrerScreen = () => {
  // logica

  // contexto
  const { registrerUser } = useAuthStore();

  // tamaño del height
  // cuando cambia el tamaño se actualiza los demas
  const { height } = useWindowDimensions();
  // console.log(height)

  // define el color
  const backgroundColor = useThemeColor({}, "background");

  // para no repetir los envios
  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  // metodo registro
  const registrer = async () => {
    // desestructurando
    const { email, password, fullName } = form;

    // vaidando campos vacios
    if (email.length === 0 || password.length === 0 || fullName.length === 0) {
      return;
    }

    // no envie 2 veces
    setIsPosting(true);

    // metodo contexto
    const registrer = await registrerUser(email, password, fullName);
    // console.log(registrer);

    setIsPosting(false);

    // todo ok
    if (registrer) {
      // seteando o clear campos
      setForm({
        email: "",
        password: "",
        fullName: "",
      });
      return Alert.alert("Confirmación", "Usuario Creado");
    }
    
    // seteando o clear campos
    setForm({
      email: "",
      password: "",
      fullName: "",
    });
    // error
    Alert.alert("Error", "Error al crear el Usuario");
  };

  // renderizado
  return (
    // KeyboardAvoidingView : para q cuando aparezca el teclado mi vista se acomede su altura
    // si sale error poner en el > app\_layout.tsx -- padre envolverlo con GestureHandlerRootView
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' :undefined} style={{ flex: 1 }} >
      {/* para q haga scrool */}
      <ScrollView style={{ paddingHorizontal: 40, backgroundColor:backgroundColor , flex:1 }}  contentContainerStyle={{ flexGrow: 1 }}>
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
            // valor input
            value={form.fullName}
            // setea el valor usestate
            onChangeText={(value) => setForm({ ...form, fullName: value })}
          />
          <ThemedTextInput
            placeholder="Correo Electronico"
            keyboardType="email-address" //teclado numerico
            autoCapitalize="none" //no autocapitalize
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry //campos ocultos
            autoCapitalize="none" //no autocapitalize
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        {/* espacio */}
        <View style={{ marginTop: 10 }} />

        {/* boton */}
        <ThemedButton
          icon="arrow-forward-circle-outline"
          // llama metodo
          onPress={registrer}
          // desabilita no envia 2 veces
          disabled={isPosting}
        >
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
          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }} replace>
            {/* todo dentro de aca es children auto , actua como props */}
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrerScreen;
