import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  // logica

  // hook color para la letra
  const primary = useThemeColor({}, 'primary');



  // renderizado
  return (
    <View style={{paddingTop:100, paddingHorizontal:20}}>
      <ThemedText style={{fontFamily:'kanitBold', color:primary}}>HomeScreen</ThemedText>
      <ThemedText style={{fontFamily:'kanitRegular'}}>HomeScreen</ThemedText>
      <ThemedText style={{fontFamily:'kanitThin'}}>HomeScreen</ThemedText>
    </View>
  );
};

export default HomeScreen;
