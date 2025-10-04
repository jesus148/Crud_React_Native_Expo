import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

// VISTA DE 1 PRODUCTO
const ProducScreen = () => {
  // logica

  // para navegar entre stack
  // Obtiene el objeto para controlar la navegación.
  const usenavigation = useNavigation();

  // se ejecuta cuando se monta el componente solo 1 vez
  useEffect(() => {
    // Cambia las opciones visuales o funcionales del header.osea agrega algo en el header arriba
    usenavigation.setOptions({
      // Permite renderizar un componente en la esquina derecha del header.
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
  }, []);

  // renderizado
  return (
    // ajusta la vista cuando aparece el teclado
    <KeyboardAvoidingView
      // como se comporta tu vista
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* para scrollear */}
      <ScrollView style={{ marginHorizontal: 10, marginTop: 20 }}>
        {/* componente vista */}
        <ThemedView>
          {/* componente input */}
          <ThemedTextInput placeholder="Titulo" style={{ marginVertical: 5 }} />

          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />

          <ThemedTextInput
            placeholder="Descripción"
            multiline //el texto contiene varias lineas
            numberOfLines={5} //numero maximo de lineas
            style={{ marginVertical: 35 }}
          />
        </ThemedView>
        {/* componente vista */}
        <ThemedView
          style={{
            marginHorizontal: 2,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          {/* componente input */}
          <ThemedTextInput
            placeholder="Precio"
            style={{ flex: 1 }}
          ></ThemedTextInput>
          <ThemedTextInput
            placeholder="Precio"
            style={{ flex: 1 }}
          ></ThemedTextInput>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProducScreen;
