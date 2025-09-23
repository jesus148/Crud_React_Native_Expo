

// METODOS REST PARA PRODUCTS 

import { productsApi } from "@/core/api/productsApi"

// metodo obtiene productos
export const getproducts = async (limit = 20 , offset = 0)=>{
    try {
        const {data} = await productsApi.get('/products', {
            // params
        })
    } catch (error) {
        
    }
}