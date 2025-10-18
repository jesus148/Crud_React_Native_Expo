import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

// clase modelo
interface Props {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  list?: boolean;
  size?: number;
}

// Componente para la camara
const MenuIconButton = ({ onPress, icon, list, size }: Props) => {
  // logica

  // hook decidir tema color
  const primaryColor = useThemeColor({}, "primary");

  // renderizado
  return (
    // boton
    <TouchableOpacity
      onPress={onPress}
      style={
        list && {
          justifyContent: "flex-start",
          alignItems: "flex-start",
          right: 0,
          bottom: 0,
          flexGrow: 1,
        }
      }
    >
      {/* icono */}
      <Ionicons name={icon} size={size ? size : 24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default MenuIconButton;

const styles = StyleSheet.create({
  lista: {
    textAlign: "center",
  },
});
