// METODOS REST PARA OBTENER 1 PRODUCTO

import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interface/get-product";



// clase modelo vacio 
// esto nos ayudara para registrar
const emptyProduct:Product={
  id:'', 
  title:'Nuevo Producto', 
  description:'', 
  price:0,
  images:[],
  slug:'', 
  gender:'',
  sizes:[],
  stock:0, 
  tags:[]
}


// METODO OBTIENE UN PRODUCTO AXIOS

// Promise<Product> : como el rest es async debes decir q sera una promesa lo q te devuelve pq tiene q esperar
export const getproductsById = async (id: string): Promise<Product> => {

  // console.log(id);

  // si el id new enviado desde el parametro devuelve un objeto vacio
  // osea el icono mas de la vista listado envia un new como params 
  if(id ==='new') return emptyProduct;

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
        // http://192.168.100.5:3000/api/files/product/7654393-00-A_2_2000.jpg ---ejemplo de estructura
        // la imagen se descarga automaticamente cuando lo ponen en un get como la image de react native
        images: data.images.map((image)=>`${API_URL}/files/product/${image}`)
    }
  } catch (error) {
    throw new Error("Unable to load prodcts");
  }
};
