import { updateCreateProduct } from "@/core/products/action/create-update-product.action";
import { deleteproducts } from "@/core/products/action/delete.action";
import { getproductsById } from "@/core/products/action/get-product-by-id.action";
import { Product } from "@/core/products/interface/get-product";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

// METODO REST PARA EJECUTAR SOLO 1 PRODUCTO GET
// formikRef?:any : recibe el propiedades del formik para manipularlo
const useProduct = (productId: string, formikRef?: any) => {
  // importando el contexto de la camara
  const { clearImages } = useCameraStore();

  // es un hook de React Query que te da acceso al Query Client.
  // del tanstack , osea todas las query se guardan ahi en cache
  // ya no pide al backend
  const queryclient = useQueryClient();

  // marca o guarda el id en el useref
  // osea es inmutable guarda el valor y no se resetea al cambiar el estado, no ejecuta renderizados
  const productidref = useRef(productId);

  // metodo rest ejecuta EXTRAE DATA DEL BACKEND SOLO 1 PRODUCTO
  const productQuery = useQuery({
    // clave key
    queryKey: ["products", productId],
    // metodo rest axios
    queryFn: () => getproductsById(productId),
    //duracion de la data de este rest en cache
    // una hora , luego pedira al back de nuevo
    staleTime: 1000 * 60 * 60,
  });

  // METODO ENVIO DATOS AL BACKEND(como registrar , actualizar .etc)
  // mutacion
  const productMutation = useMutation({
    // metodo para acutalizar o crear segun sea el caso
    // recibe la data del formulario
    mutationFn: async (data: Product) =>
      updateCreateProduct({
        // desestructura
        ...data, //envio de data
        id: productidref.current, // envio del id
      }),
    // si lo de arriba es correcto , recibe la data como props
    onSuccess(data: Product) {
      // si esta registrando resetea las cajas del Formik
      if (productidref.current === "new") {
        // printer valores
        // console.log("Formik actual:", formikRef.current);
        // valores resetea accede al formikRef q tiene todo las propiedades
        formikRef?.current?.resetForm();
      }

      // del dato de arriba osea si el update o crear es correcto
      // se setea el productidref con el nuevo valor
      // si ya registraste lo guarda de tal forma que si registras otra vez seria un update pq envia el id
      productidref.current = data.id;

      // limpiando el contexto de zustand
      // osea limpiando las imagenes temporales de la vista de 1 get producto
      clearImages();

      // metodos para actualizar el listado
      // osea cuando registras o actualizas se muestre auto en el listado}
      // recordar que tansquery guarda todo en cache x eso debes cambiar
      // de tu useProducts donde listas todo poner el queryKey para recargar
      queryclient.invalidateQueries({
        queryKey: ["prducts", "infinite"],
      });

      // actualizando el get de 1 usuario en la pantalla de 1 producto
      // como el titulo y valores del input
      queryclient.invalidateQueries({
        queryKey: ["products"],
      });

      // esto es para refrescar el producto donde estas
      // app\(products-app)\product\[id].tsx
      // Refresca el producto específico actualizado o creado
      queryclient.invalidateQueries({
        queryKey: ["prducts", data.id],
      });

      // printer modal alert
      Alert.alert("Producto guardado", `${data.title} se guardo correctamente`);
    },
    // si hay error
    onError: (error, newtodom, context) => {
      console.log(error);
      console.log(error.message);
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





// ELIMINACION 1 PRODUTO
// metodo eliminando 1 producto
export const useDleteProduct = () => {

  // tener acceso a todas la query almacenadas en cache
  // para despues pedirle a eso y no al backend
  // ademas de aqui se refresaca la data
  const queryclient = useQueryClient();

  // const productdelete = useQuery({
  //   queryKey:["productsEraser",productId],
  //   queryFn:()=> deleteproducts(productId),
  //   staleTime: 1000 * 60 * 60
  // })

  // metodo llama al metodo rest eliminacion
  const productmutation = useMutation({
    // envia el id
    mutationFn: async (id: string) => {
      deleteproducts(id);
    },

    // di todo es correcto
    onSuccess(data: any) {
      // console.log(data)


      // metodos para actualizar el listado
      // osea cuando registras o actualizas se muestre auto en el listado}
      // recordar que tansquery guarda todo en cache x eso debes cambiar
      // de tu useProducts donde listas todo poner el queryKey para recargar
      queryclient.invalidateQueries({
        queryKey: ["prducts", "infinite"],
      });

      // printer modal alert
      Alert.alert("Producto eliminado", `producto eliminado correctamente`);
    },

    // si hay error
    onError: (error) => {
      console.log(error);
      console.log(error.message);
    },
  });
// exportando
  return {
    productmutation,
  };
};
