import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

// clase modelo
interface Props {
  options: string[];
  selectOptions: string[];

  onSelect: (option: string) => void;
}

// COMPONENTE BOTON
const ThemedButtonGroup = ({ options, selectOptions, onSelect }: Props) => {
  // logica
  // console.log("tests");
  // console.log(selectOptions);

  // hook para determinar color tema
  const primaryColor = useThemeColor({}, "primary");

  // renderizado
  return (
    <View style={styles.container}>
      {
        // recorriendo
        options.map((option) => (
          // boton con opacidad
          <TouchableOpacity
            key={option} //key primaria
            // llama la funcion prop pa actualizar
            // y le envia el item
            onPress={()=>onSelect(option)}
            // estilos
            style={[
              styles.button,
              // verifica si el option incluye en el selectOptions
              // y si esta se marqua de color
              selectOptions.includes(option) && {
                backgroundColor: primaryColor,
              },
            ]}
          >
            {/* renderiza */}
            <Text
              adjustsFontSizeToFit //la letra se reduce segun el tamaño
              numberOfLines={1}//corta el texto si es largo
              // estilos
              style={[
                // estilo fijo
                styles.buttontext,
                // verificar si del selectOptions esta incluido el option
                // cambia el color de la letra
                selectOptions.includes(option) && styles.selectButtonText,
              ]}
            >
              {/* option[0].toUpperCase() : convierte primera letra en mayuscula */}
              {/* option.slice(1): desde index 0 crea un nuevo array */}
              {option[0].toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};

export default ThemedButtonGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttontext: {
    fontSize: 12,
  },
  selectButtonText: {
    color: "#fff",
  },
});
