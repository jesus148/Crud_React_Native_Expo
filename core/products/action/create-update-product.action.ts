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

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }
  return createProduct(product);
};

// metodo actualizar
const updateProduct = async (product: Partial<Product>) => {
  const {id, images=[], user, ...rest} = product;
  try {
    const { data} = await productsApi.patch<Product>(`/products/${id}`,
      {...rest}
    )
    return data;
  } catch (error) {
    throw new Error("Function not implemented");
  }
};

// metodo crear 
async function createProduct(product: Partial<Product>) {
    const {id, images=[], user, ...rest} = product;
  try {
    const { data} = await productsApi.post<Product>(`/products/${id}`,
      {...rest}
    )
    return data;
  } catch (error) {
    throw new Error("Function not implemented");
  }
}
