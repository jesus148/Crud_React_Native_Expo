import { useColorScheme } from "@/presentation/theme/hooks/useColorScheme.web";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

// Create a client
// importando para el estado queryclient
const queryClient = new QueryClient({
  // Aquí defines opciones globales que se aplican a todas las queries y mutations de tu app.
  defaultOptions: {
    // Significa que todas las queries (peticiones GET) por defecto no reintentarán la petición si falla.
    queries: {
      retry: false,
    },
  },
});

// VISTA PRINCIPAL

export default function RootLayout() {
  // useColorScheme detecta el modo COLOR del dispositivo.
  const colorScheme = useColorScheme();

  // hook obtiene color
  const backgroundColor = useThemeColor({}, "background");

  // cargando las fuentes
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    kanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
    kanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
    kanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
  });
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // GestureHandlerRootView : para manejar mejor los boton de react  native
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
       {/* TanStack Query  : para el manejo de estado de peticiones rest
       envolver en todo , esto sirva para almcenar el cache la data se guarda ahi y ya no es nesecario volver a solicitar data.  */}
      <QueryClientProvider client={queryClient} >
        {/* // ThemeProvider aplica DarkTheme o DefaultTheme según el esquema. */}
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
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
            screenOptions={{
              //quitando el header
              headerShown: false,
            }}
          ></Stack>

          {/* barra de estado segun el tema */}
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
