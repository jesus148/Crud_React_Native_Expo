import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const CheckAutenticadLayaout = () => {
  // logica

  // contexto zustand
  const {status , checkStatus} = useAuthStore();

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
    <Stack>
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