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



// metodo para prepara imagenes
// el metodo sirve para subir imagenes q no estan en el servidor yy devolver un array con todas las imágenes ya “listas”
// "file:///data/.../imagen1.jpg" → imágenes locales del dispositivo.
// "https://mi-servidor.com/uploads/img123.jpg" → imágenes ya subidas al servidor.
const prepareImages = async (images:string[]):Promise<string[]> =>{

  // todas las imágenes locales, es decir, aquellas que contienen "file" en su ruta
  const fileimages = images.filter((image)=> image.includes('file'));

  // todas las imágenes que ya están subidas, es decir, las que vienen con URL del servidor
  const currentImages = images.filter((image)=> !image.includes('file'))
  
  // Si hay imágenes locales
  if(fileimages.length > 0){
    // llama a la funcion para subir las imagenes al servidor
    const uploadPromises = fileimages.map(img => uploadImage(img));
    // Ejecuta todas las subidas en paralelo y espera a que terminen.
    // espera que todas las promesas terminen.
    // Cuando todas finalizan, devuelve un array con los resultados.
    const uploadedImages = await Promise.all(uploadPromises);

    // Agrega todas las URLs recién subidas al array currentImages
    currentImages.push(...uploadedImages);  
  }

  // retorna un nuevo array
  // split('/') : separa por el / , 
  // " https://miapi.com/uploads/foto1.jpg".split('/')
// Resultado: ["https:", "", "miapi.com", "uploads", "foto1.jpg"]
// pop()! :toma el último elemento del array resultante. y el ! de tara algo seguro.
  return currentImages.map((img)=>img.split('/').pop()!);
}

// metodo para subir la imagen local al servidor y devuelve su URL final.
// ejemplo > uploading("file:///data/foto1.jpg") → "https://mi-api.com/uploads/foto1.jpg"
const uploadImage = async(image:string):Promise<string>=>{
  // FormData sirve para enviar datos tipo formulario, especialmente archivos (
  const formadata = new FormData();

  // Aquí se agrega un campo al FormData con el nombre 'file'
  formadata.append('file',{
    uri:image,  //la ruta local de la imagen
    type:'image/jpeg',  //el MIME type, que indica el tipo de archivo
    name:image.split('/').pop(),//el nombre del archivo.
  } as any);

  // metodo axios post , guarda el img en un bd externo al backend como un aws o supabase()
  // y devuelve un objeto data y dentro la images
  // <{image :string}> : la respuesta de esto post sera esto
  const {data} = await productsApi.post<{image :string}>(
    '/files/product',//ruta
    formadata, //En el cuerpo (body) envías el formadata.
    {
      // En los headers, se indica el tipo de contenido
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }
  );

  // Esto devuelve la URL remota de la imagen ya subida (la que guardarás en la base de datos y de ahi pediremos al back otravez 
  // para pintar en la vista con la imagen).
  // retorna algo asi > "image": "https://midominio.com/uploads/foto.jpg"
  return data.image;
}





// metodo actualizar
const updateProduct = async (product: Partial<Product>) => {

  // console.log({images:product.images});


  // desestructurando , sacando el id , images , user 
  // y el resto ...rest 
  const {id, images=[], user, ...rest} = product;
  try {

    // preparando las imagenes , ose registrando la imagen aparte las del local(osea las temporales)
    //osea las imagenes ya guardadas en local(temporales) y las ya registradas , al final solo queremos el nombre
    // y lo toda la url por eso la formateamos ,
    const checkImages = await prepareImages(images);

    // metodo axios , enviamos el id y el resto ...rest
    const { data} = await productsApi.patch<Product>(`/products/${id}`,{
      ...rest, //el resto
      images:checkImages //las imagenes
    })

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("update Function not implemented");
  }
};

// metodo crear producto
async function createProduct(product: Partial<Product>) {
  // desestructurando
    const {id, images=[], user, ...rest} = product;
  try {
        // preparando las imagenes , ose registrando la imagen aparte las del local(osea las temporales)
    //osea las imagenes ya guardadas en local y las guardas en la base de datos 
        const checkImages = await prepareImages(images);
    // metodo rest crear
    const { data} = await productsApi.post<Product>(`/products`,
      {
        ...rest,//el resto
        images:checkImages //las imagenes
      }
    )
    // retornando
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("create Function not implemented");
  }
}
