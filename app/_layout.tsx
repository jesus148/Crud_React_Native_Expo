import { useColorScheme } from '@/presentation/theme/hooks/useColorScheme.web';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';


// VISTA PRINCIPAL

export default function RootLayout() {


  // useColorScheme detecta el modo COLOR del dispositivo.
  const colorScheme = useColorScheme();
  
    // hook obtiene color
    const backgroundColor = useThemeColor({},'background');
  
  // cargando las fuentes
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    kanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
    kanitBold: require('../assets/fonts/Kanit-Bold.ttf'),
    kanitThin: require('../assets/fonts/Kanit-Thin.ttf'),
  });
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // GestureHandlerRootView : para manejar mejor los boton de react  native
    <GestureHandlerRootView style={{backgroundColor:backgroundColor, flex:1}}>
      
    {/* // ThemeProvider aplica DarkTheme o DefaultTheme según el esquema. */}
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      {/* 1 ejemplo */}
      {/* <Stack> */}
        {/* name="(product-app)" : ruta principal */}
        {/* options={{ headerShown: false }} : quita el header */}
        {/* <Stack.Screen name="(product-app)" options={{ headerShown: false }} /> */}
        {/* para manejar rutas no encontradas */}
        {/* <Stack.Screen name="+not-found" /> */}
      {/* </Stack> */}


      {/* 2 ejemplo */}
      {/* x default sale el primero folder con el index si no pones nada */}
      {/* o en todo caso muestra el app\(products-app)\_layout.tsx --- si hay un layout dentro de ahi */}
      <Stack 
      screenOptions={{  //quitando el header
        headerShown:false
      }}
      >


      </Stack>

      {/* barra de estado segun el tema */}
      {/* <StatusBar style="auto" /> */}
    </ThemeProvider>

    </GestureHandlerRootView>
  );
}
