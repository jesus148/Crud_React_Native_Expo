import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

// VISTA LOGIN

const LoginScreen = () => {
  // logica


  // contexto
  const {login} = useAuthStore();

  // tamaño del height
  // cuando cambia el tamaño se actualiza los demas
  const { height } = useWindowDimensions();
  // console.log(height)

  // define el color
  const backgroundColor = useThemeColor({}, 'background');

  
  // para no repetir los envios
  const [isPosting,setIsPosting ] = useState(false);


  // para setear valores inputs
  const [form, setForm] =  useState({
    email:'', 
    password:''
  });


  // metodo logeo
  const onLogin = async ()=>{
    // desestructurando
    const {email, password} = form;
    // console.log({email, password});

    // si estan vacios
    if(email.length === 0 || password.length === 0){
      return;
    }

    // para evitar enviar varias veces espera
    setIsPosting(true);

    // metodo rest
    const wasSuccesFul = await login(email, password);
    
    // para evitar enviar varias veces espera
    setIsPosting(false);

    // todo correcto
    if(wasSuccesFul){
      // replace genera una nueva vista no usa pilas como stack(uno detras de otra vista)
      // app\_layout.tsx
      router.replace('/');
      return;
    }
    // printer
    Alert.alert('Error', 'Usuario o Contraseña no son Correctas');
  }



  // renderizado
  return (
    // KeyboardAvoidingView : para q cuando aparezca el teclado mi vista se acomede su altura
    // si sale error poner en el > app\_layout.tsx -- padre envolverlo con GestureHandlerRootView
    // behavior : comportamineto segun ios o android
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' :undefined} style={{ flex: 1 }} >
      {/* para q haga scrool */}
      {/* contentContainerStyle={{ flexGrow: 1 }} :Hace que el contenido del ScrollView ocupe todo el alto disponible
(incluso después de que el teclado desaparece).en caso aparezca algo abajo como un margin */}
      <ScrollView style={{ paddingHorizontal: 40, backgroundColor:backgroundColor , flex:1 }}  contentContainerStyle={{ flexGrow: 1 }}>
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
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Correo Electrónico"
            keyboardType="email-address" //tipo de input
            autoCapitalize="none"
            icon="mail-outline" 
            value={form.email} //value del input
            // cuando escribe ejecuta esto , solo cambia el email
            onChangeText={(value)=> setForm({...form, email:value})}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry //campos ocultos
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value)=>setForm({...form, password:value})}
          />
        </View>


        {/* espacio */}
        <View style={{marginTop:10}} />

        {/* boton */}
        <ThemedButton 
        icon="arrow-forward-circle-outline"
        onPress={onLogin} //envia
        disabled={isPosting} //desabilitado , evita el repetido
        >
          {/* todo dentro de aca es children auto , actua como props */}
          Ingresar
        </ThemedButton>

        {/* espacio */}
        <View style={{marginTop:40}} />


        {/* enlace registro */}
        <View
        style={{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
        }}
        >
          <ThemedText>¿No tienes cuenta?</ThemedText>
          {/* redirige ahi > app\auth\registrer */}
          {/* replace : borra todo las rutas y agrega la nueva
          ideal cuando no usas stack o slot de expo 
          evita cargas acumulativas y q te salga vista vacias */}
          <ThemedLink href='/auth/registrer' style={{marginHorizontal:5}} replace>
            {/* todo dentro de aca es children auto , actua como props */}
            Crear Cuenta
          </ThemedLink>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
