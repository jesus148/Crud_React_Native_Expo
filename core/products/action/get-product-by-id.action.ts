// METODOS REST PARA OBTENER 1 PRODUCTO

import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interface/get-product";

// Promise<Product> : como el rest es async debes decir q sera una promesa lo q te devuelve pq tiene q esperar
export const getproducts = async (id: string): Promise<Product> => {
  try {
    // metodo rest
    const { data } = await productsApi.get<Product>(`/products/${id}`);

    // retornando
    // retornando
    return {
        // data completa menos images
        ...data,
        // setea de la data solo images
        images: data.images.map((image)=>`${API_URL}/files/product/${image}`)
    }
  } catch (error) {
    throw new Error("Unable to load prodcts");
  }
};
