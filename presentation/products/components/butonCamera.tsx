import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

// clase modelo
interface Props {
  onPress?: () => void;
  posicion?: "confirm" | "flip" | "galery" | "cancel" | "center" | "cancel2";
  centered?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
}

// COMPONENTE BOTON PARA LA VISTA CAMARA , reutilizalble

const ButonCamera = ({ onPress, posicion, iconName, centered }: Props) => {
  // logica

  // para calcular dimension a medida q cambia
  const dimensions = useWindowDimensions();

  // hook para mostrar segun el tema
  const primaryColor = useThemeColor({}, "primary");

  // componente
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        (posicion === "center" || posicion === "confirm") &&
          styles.shutterButton,

        

        centered && {
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },

        posicion === "confirm" && {
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },

        // estilos con if
        posicion === "flip" ? styles.flipCameraButton : undefined,
        posicion === "galery" ? styles.galleryButton : undefined,
        posicion === "cancel" ? styles.returnCancelButton : undefined,
        posicion === "cancel2" ? styles.returnCancelButton : undefined,
      ]}
    >
      {/* si se cumple */}
      {posicion === "center" && (
        <Ionicons name={iconName} size={30} color={primaryColor} />
      )}
      {posicion === "confirm" && (
        <Ionicons name={iconName} size={30} color={primaryColor} />
      )}
      {/* si se cumple */}
      {posicion != "center" &&  posicion != "confirm"  && (
        <Ionicons name={iconName} size={30} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default ButonCamera;

// estilos
const styles = StyleSheet.create({
  // estilos centro
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    // borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
