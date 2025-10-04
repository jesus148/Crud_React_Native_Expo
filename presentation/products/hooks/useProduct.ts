import { getproducts } from "@/core/products/action/get-products.action"
import { useInfiniteQuery } from "@tanstack/react-query"

// HOOK PERSONALIZADO
// METODO ENCARGADO DE EJERCUATAR EL REST
// se usa con tanskquery

export const useProducts = () =>{
    // useInfiniteQuery :Es como useQuery, pero en vez de traer una sola página de datos, te permite traer páginas sucesivas según el scroll o el botón “cargar más”.
    const productsQuery = useInfiniteQuery({
        queryKey:['prducts','infinite'], //Este array identifica de manera única a la query en el cache.
        // queryFn es la función que realmente pide los datos. , le envia parametros 20 el limite de productos, 
        // pageParam * 20 : es el offset, que depende de la página actual.
        queryFn:({pageParam}) => getproducts(20, pageParam * 20),

        staleTime:1000 * 60 * 60, //duracion de la data de este rest en cache
        initialPageParam:0, //parametro inical del pageParam
        // Esto define cómo calcular el siguiente pageParam después de cada petición.
        // lastPage → lo que devolvió la última query.
        // allpages → un array con todas las páginas cargadas hasta ahora.
        // allpages.length :Si ya cargaste 1 página → siguiente será 1.
        getNextPageParam:(lastPage, allpages) => allpages.length
    })

    // retorna
    return{
        // data cargada
        productsQuery,
        // metodo para cargar mas
        loadNextPage:productsQuery.fetchNextPage,
    }
}