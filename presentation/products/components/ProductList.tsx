import { Product } from '@/core/products/interface/get-product';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ProductCard } from './ProductCard';

// COMPONENTE PARA LISTAR PRODUCTOS

// clase modelo
interface Props{
  products : Product[];
  loadNextPage:()=>void;
}

const ProductList = ({products, loadNextPage}:Props) => {
  // logica


  const [isRefreshing, setIsRefreshing] = useState(false);

  // llamando al cliente de tanstack
  const queryclient = useQueryClient();

  // metodo refrescar data osea vacear data
  const onPullToRefresh = async() =>{
    setIsRefreshing(true);
    // metodo de stop , despues de 2 segundos continua con el resolve
    await new Promise((resolve)=>setTimeout(resolve,200));

    // resetea tu rest de listado productos
    // presentation\products\hooks\useProducts.ts
    queryclient.invalidateQueries({
      queryKey:['prducts','infinite']
    });
    setIsRefreshing(false);
  }


  // renderizado
  return (
    // manejar listado en react native
    <FlatList 
    style={{marginBottom:51}}
    data={products} //data
    numColumns={2} //columnas
    keyExtractor={(item)=>item.id} //clave unica
    // envia el objeto item
    renderItem={({item}) => <ProductCard product={item} />}
    onEndReached={loadNextPage} //al final ejecuta esto
    onEndReachedThreshold={0.8} //de la lista q mostrar antes q llege 0.8 significa: cuando el scroll haya llegado al 80% de la lista.
                                  // ejecuta el loadNextPage
    showsVerticalScrollIndicator={false} //Oculta la barrita de scroll vertical.
    refreshControl={
      // metodo actualizar o resetear llama al metodo y el usestate
      // osea es el boton que aparece arriba cuando quieres actualizar el listado
      // refreshing : muestra el spinner
      // onRefresh={onPullToRefresh}  : ejecuta la funcion
      <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
    }
    />
  )
}

export default ProductList;



