// METODOS REST PARA OBTENER 1 PRODUCTO

import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interface/get-product";

// Promise<Product> : como el rest es async debes decir q sera una promesa lo q te devuelve pq tiene q esperar
export const getproductsById = async (id: string): Promise<Product> => {
  try {
    // metodo rest
    const { data } = await productsApi.get<Product>(`/products/${id}`);
    // console.log(data.images)

    // retornando
    // retornando
    return {
        // data completa menos images
        ...data,
        // setea de la data solo images, recorre y devuelve un array , 
        // osea enviamos el image al back con el endpoint para que nos de la img
        images: data.images.map((image)=>`${API_URL}/files/product/${image}`)
    }
  } catch (error) {
    throw new Error("Unable to load prodcts");
  }
};
