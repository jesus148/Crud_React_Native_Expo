import { productsApi } from "@/core/api/productsApi";


// METODO AXIOS PARA ELIMINAR 
export const deleteproducts = async (id:string)=>{
try {
 const  {data} = await productsApi.delete(`/products/${id}`);
 return {
    data
 }  
} catch (error) {
    throw new Error("unabled to load products")
}
}