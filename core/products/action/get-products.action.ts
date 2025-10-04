

// METODOS REST PARA PRODUCTS 

import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interface/get-product";

// metodo obtiene productos

export const getproducts    = async (limit = 20 , offset = 0)=>{
    try {
        // metodo rest
        // <Product[]> : te devuelve
        // recordar este es un metodo de un backend externo
        // limit : es la cantidad de productos dentro de la pagina
        // offset : es el numero de pagina 
        const {data} = await productsApi.get<Product[]>('/products', {
            // envio de parametros para paginacion
            params:{
                limit, 
                offset
            }
        });

        // printer
        console.log(data);

        // retornando
        return data.map((product)=>({
            ...product, //copia todas las propiedades originales de product.
            // reescribe la propiedad images del objeto. osea lo seteas
            images:product.images.map(
                // Toma el nombre de la imagen (a.jpg) y le agrega la URL completa.
                (image)=> `${API_URL}/files/product/${image}`
            )
        }));
    } catch (error) {
        throw new Error('Unable to load prodcts')
    }
}