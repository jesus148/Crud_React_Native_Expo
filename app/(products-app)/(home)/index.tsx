import ProductList from "@/presentation/products/components/ProductList";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import { FAB } from "@/presentation/theme/components/FAB";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

// VISTA PARA RENDERIZAR LISTA PRODUCTOS
const HomeScreen = () => {
  // logica

  // hook color para la letra
  const primary = useThemeColor({}, 'primary');


  // usando el tanskeqery para el contexto
  const {productsQuery, loadNextPage} =useProducts();


  // si esta en curso la solicitud
  if(productsQuery.isLoading){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={30}/>
      </View>
    )
  }


  // renderizado
  return (
    <View style={{paddingHorizontal:20}}>
      {/* componente listar productos */}
      <ProductList
      // Cuando usas useInfiniteQuery, los resultados vienen agrupados en páginas.
      // Entonces, productsQuery.data.pages es un array de arrays (cada elemento es una página).
      // flatMap sirve para aplanar un array de arrays en un solo array.
      // En este caso, cada page ya es un array de productos, así que flatMap((page) => page) hace:
//       [
//   [ {id:1}, {id:2}, {id:3} ],
//   [ {id:4}, {id:5}, {id:6} ],
//   [ {id:7}, {id:8}, {id:9} ],
// ]
// queda asi 
// [
//   {id:1}, {id:2}, {id:3},
//   {id:4}, {id:5}, {id:6},
//   {id:7}, {id:8}, {id:9},
// ]
// ??[] si es null devuelve vacio
       products={productsQuery.data?.pages.flatMap((page)=>page)??[]}
       loadNextPage={loadNextPage}
      />

      {/* COMPONENTE BOTON MAS ABAJO PARA AGREGAR PRODUCTO */}
      <FAB
      iconName="add-outline" //icono
      // metodo para redirecciona con el push del stack
      // osea agrega pilas 
      // app\(products-app)\product\[id].tsx
      // recordar como parametro le envia el new osea remplaza el [id]
      onPress={()=> router.push(`/(products-app)/product/new`)}
      />
    </View>
  );
};

export default HomeScreen;
