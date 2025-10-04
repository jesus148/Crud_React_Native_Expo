import { Product } from "@/core/products/interface/get-product";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

// COMPONENTE PARA MOSTRAR CADA CARD DE PRODUCTO DEL LISTADO

// clase modelo
interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
    // logica

    // renderizado
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 5,
      }}
    >
        {/* product/${product.id} */}
        {/* esto redirige : app\(products-app)\product\[id].tsx */}
        {/* boton */}
      <TouchableOpacity onPress={() => router.push(`/product/${product.id}` as any)}>

        {/* si img esta vacio o no encuentra */}
        {product.images.length === 0 ? (
          <Image
            source={require('../../../assets/images/no-product-image.png')}
            style={{ width: '100%', height: 200 }}
          />
          // si esta muestra
        ) : (
          <Image
          // muestra solo el primer img
            source={{ uri: product.images[0] }}
            style={{ flex: 1, height: 200, width: '100%' }}
          />
        )}

        {/* muestra el texto */}
        <ThemedText
          numberOfLines={2}
          style={{ textAlign: 'center' }}
          darkColor={'black'}
        >
          {/* renderiza texto */}
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
