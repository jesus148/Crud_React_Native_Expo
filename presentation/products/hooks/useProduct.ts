import { updateCreateProduct } from "@/core/products/action/create-update-product.action";
import { getproductsById } from "@/core/products/action/get-product-by-id.action";
import { Product } from "@/core/products/interface/get-product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

// METODO REST PARA EJECUTAR SOLO 1 PRODUCTO GET
const useProduct = (productId: string) => {

  
  // es un hook de React Query que te da acceso al Query Client.
  // del tanstack , osea todas las query se guardan ahi en cache
  // ya no pide al backend
  const queryclient = useQueryClient();
  
  const productidref= useRef(productId);


  // metodo rest ejecuta EXTRAE DATA DEL BACKEND
  const productQuery = useQuery({
    // clave key
    queryKey: ["products", productId],
    // metodo rest axios
    queryFn: () => getproductsById(productId),
    //duracion de la data de este rest en cache
    staleTime: 1000 * 60 * 60,
  });

  // METODO ENVIO DATOS AL BACKEND(como registrar , actualizar .etc)
  // mutacion
  const productMutation = useMutation({
    // metodo para acutalizar o crear segun sea el caso
    // recibe la data del formulario
    mutationFn: async (data: Product) => updateCreateProduct({
      ...data,
      id:productidref.current
    }),
    // si lo de arriba es correcto , recibe la data como props
    onSuccess(data: Product) {

      productidref.current = data.id;


      // metodos para actualizar el listado 
      // osea cuando registras o actualizas se muestre auto en el listado}
      // recordar que tansquery guarda todo en cache x eso debes cambiar
      // de tu useProducts donde listas todo poner el queryKey para recargar
      queryclient.invalidateQueries({
        queryKey:['prducts','infinite'],
      });

      // actualizando el get de 1 usuario en la pantalla de 1 producto
      // como el titulo y valores del input
      queryclient.invalidateQueries({
        queryKey:['products'],
      });


      // Refresca el producto específico actualizado o creado
      queryclient.invalidateQueries({
        queryKey:['prducts',data.id],
      });

        // printer modal alert 
      Alert.alert("Producto guardado", `${data.title} se guardo correctamente`);
    },
  });

  // mantener el id del producto en caso de ser uno nuevo

  // retorna
  return {
    productQuery,
    productMutation,
  };
};

export default useProduct;
