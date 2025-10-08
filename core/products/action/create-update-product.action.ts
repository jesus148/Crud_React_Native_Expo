import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interface/get-product";

// METODO REST AXIOS PARA ACTUALIZAR O REGISTRAR PRODUCTOS
// Partial<Product> : recibe una parte de atributos osea opcional
export const updateCreateProduct = (product: Partial<Product>) => {


  // isNaN: si no es numero es true
  // isNaN(Number(product.stock)) ? 0  : coniverte a number y si no es un numero vale 0
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  // igual convirtiendo a numero el price
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  // verificamos si existe el id y si el id es diferente a new
  // entonces actualiza
  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }
  // y si no crea si no existe
  return createProduct(product);
};

// metodo actualizar
const updateProduct = async (product: Partial<Product>) => {
  // desestructurando , sacando el id , images , user 
  // y el resto ...rest 
  const {id, images=[], user, ...rest} = product;
  try {
    // metodo axios , enviamos el id y el resto ...rest
    const { data} = await productsApi.patch<Product>(`/products/${id}`,
      {...rest}
    )
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Function not implemented");
  }
};

// metodo crear producto
async function createProduct(product: Partial<Product>) {
  // desestructurando
    const {id, images=[], user, ...rest} = product;
  try {
    // metodo rest crear
    const { data} = await productsApi.post<Product>(`/products`,
      {...rest}
    )
    // retornando
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Function not implemented");
  }
}
