import { getproductsById } from "@/core/products/action/get-product-by-id.action"
import { useQuery } from "@tanstack/react-query"


// METODO REST PARA EJECUTAR SOLO 1 PRODUCTO GET
const useProduct = (productId:string) => {
    
    // metodo rest ejecuta
    const productQuery= useQuery({
        // clave key
        queryKey:['products',productId],
        // metodo rest axios
        queryFn:()=> getproductsById(productId),
        //duracion de la data de este rest en cache
        staleTime:1000 * 60 *60
    })

    // retorna
    return{
        productQuery
    }
}

export default useProduct