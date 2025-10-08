import React from "react";
import { FlatList, Image, View } from "react-native";

// COMPONENTE MUESTRA IMAGENES
interface Props {
  images:[]
}

const ProductImage = ({ images }: Props) => {
  // logica


//   si no hay imagenes
  if (images.length === 0) {
    return (
      <View style={{
        flex:1,
        alignItems:'center'
      }}>
        <Image
          source={require("../../../assets/images/no-product-image.png")}
          style={{ width: "100%", height: 200 }}
        />
      </View>
    );
  }

  // renderizado
  return (
    // renderizando el listado de productos
    <FlatList 
    data={images} //data
    keyExtractor={(item)=>item} //clave unica
    horizontal //horizontal
    showsHorizontalScrollIndicator={false}//Oculta la barrita de scroll vertical.
        // envia el objeto item
    renderItem={({item})=>(
      <Image 
      // datos diamicos img de un rest
      source={{uri:item}}
      // estilos
      style={{
        width:230,
        height:230,
        marginHorizontal:7,
        borderRadius:5
      }}
      />
    )}
    />
  )
};

export default ProductImage;
