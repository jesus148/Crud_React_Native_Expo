import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const CheckAutenticadLayaout = () => {
  // logica

  // contexto zustand
  const {status , checkStatus} = useAuthStore();

  // hook obtiene color
  const backgroundColor = useThemeColor({},'background');

  // se ejecua al iniciar la app
  useEffect(() => {
    checkStatus();
  }, [])



  // si esta verificando muestra spinner
  if(status === 'checking'){
    // spinner  
    return(
      <View 
      style={{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        marginBottom:5
      }}>
        <ActivityIndicator />
      </View>
    )
  }


  // si no esta autorizado
  if(status === 'unauthenticated'){
    // redirecciona > app\auth\login
    return <Redirect href='/auth/login' />
  }


  // renderizado solo para users utenticados
  return (
    <Stack 
    screenOptions={{
      //Quita la línea/sombra que aparece debajo del header
      headerShadowVisible:false, 
      // Cambia el estilo del header
      headerStyle:{
        backgroundColor:backgroundColor
      },
      // Cambia el estilo del área de contenido
      contentStyle:{
        backgroundColor:backgroundColor
      }
    }}
    >
      {/* muestra la vista > app\(products-app)\(home)\index.tsx */}
      <Stack.Screen 
      name="(home)/index"
      options={{
        title:'Products'
      }}
      />
    </Stack>
  );
  
}

export default CheckAutenticadLayaout;