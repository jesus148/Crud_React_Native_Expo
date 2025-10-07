import { updateCreateProduct } from "@/core/products/action/create-update-product.action";
import { getproductsById } from "@/core/products/action/get-product-by-id.action";
import { Product } from "@/core/products/interface/get-product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

// METODO REST PARA EJECUTAR SOLO 1 PRODUCTO GET
const useProduct = (productId: string) => {
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
    mutationFn: async (data: Product) => updateCreateProduct(data),
    // si lo de arriba es correcto , recibe la data como props
    onSuccess(data: Product) {
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
