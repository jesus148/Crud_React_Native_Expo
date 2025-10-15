import ProductImage from "@/presentation/products/components/ProductImage";
import useProduct from "@/presentation/products/hooks/useProduct";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import MenuIconButton from "@/presentation/theme/components/MenuIconButton";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { Redirect, router, useLocalSearchParams, useNavigation } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

// VISTA DE 1 PRODUCTO
const ProducScreen = () => {
  // logica



  // importando el contexto de la camara con zustand
  const {selectImage, clearImages} = useCameraStore();




  // obtiene el id del product al entrar a esto
  const { id } = useLocalSearchParams();


  // metodo rest para obtener product solo 1
  // `${id}` : convierte a string
  const { productQuery , productMutation } = useProduct(`${id}`);
  // console.log(productQuery.data);

  // sacando la data
  const product = productQuery.data!;
  // console.log(product)

  // para navegar entre stack , o al objeto o vista donde entras
  // Obtiene el objeto para controlar la navegación.
  const usenavigation = useNavigation();





  // se ejecuta al montarse solo 1 vez
  // en este caso es un return entonces lo guarda
  useEffect(() => {
    // esto es importante 
    // cuando hay un return dentro del useEffect 
    // react lo guarda autoamticamente para que cuando desmonte este componente
    // se ejecute esto
    return () =>{
      clearImages();
    }
  }, []);




  


  // se ejecuta cuando se monta el componente solo 1 vez
  useEffect(() => {
    // Cambia las opciones visuales o funcionales del header.osea agrega algo en el header arriba
    usenavigation.setOptions({
      // Permite renderizar un componente en la esquina derecha del header. , es el componente camara
      headerRight: () => <MenuIconButton 
      // app\(products-app)\camera\index.tsx
      // push agrega  a la pila
       onPress={()=>router.push('/camera')}
       icon="camera-outline"
      />,
    });
  }, []);

  // si hay data en el [productQuery.data] cambia
  useEffect(() => {
    //  si hay data en el [productQuery.data]
    if (productQuery.data) {
      // cambia las opciones de la vista
      usenavigation.setOptions({
        // Permite renderizar un componente en el texto derecha del header.
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  // si esta en curso la solicitud
  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  // si no exista la data
  if (!productQuery.data) {
    // redirecciona > app\(products-app)\(home)\index.tsx
    return <Redirect href="/(products-app)/(home)" />;
  }

  // renderizado
  return (
    // usando el formik para manejar el estado de formularios
    // initialValues : valor inicial, osea la data la data lo pone ahi
    // onSubmit : para manejar el formulario, es la data q enviaras de los form
      // se envia como objeto
    // recordar el Formik guarda la data como en memoria antes de enviar
    // onSubmit={productMutation.mutate} : envia el obejto de product de formik ya alterado al productMutation
    // para su registro o update 
    <Formik initialValues={product} 
    onSubmit={(productlike)=> productMutation.mutate({
      ...productlike, //tra todo la data del form este con formik
      // y la parte de images lo separa
      // productlike.images lo que tenga el form osea lo se halla obtenido con el get 
      // ...selectImage : de las imagenes del contexto con zustand , ose cuando 
      images:[...productlike.images, ...selectImage]
    })}>  
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        // ajusta la vista cuando aparece el teclado
        <KeyboardAvoidingView
          // como se comporta tu vista
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* para scrollear */}
          <ScrollView
          // para refrescar osea actualizar los datos
          // para refresca permitir el gesto de “arrastrar hacia abajo para actualizar
          refreshControl={
            <RefreshControl 
            // cuando esta trayendo los datos el backend se muestra
            refreshing={productQuery.isFetching}
            // Función que se ejecuta cuando el usuario arrastra hacia abajo
            onRefresh={async()=>{
              // fuerza a recargar la data
              // presentation\products\hooks\useProduct.ts
              await productQuery.refetch();
            }}
            />
          }
          >
            {/* componente imagenes muestra */}
            {/* recorrido de un productos solo sus imagenes q es un array */}
            {/* values.images : envio de data del initialvalues, el array de imagenes */}
            {/* <ProductImage images={values.images} /> */}

            {/* ...product.images, : valores o imagenes del rest de solo 1 producto osea la data */}
            {/* ...selectImage : imagenes del contexto de zustand usando la camara de expo , lo agrega o lo suma */}
            <ProductImage images={[...product.images, ...selectImage]} />

            {/* componente vista */}
            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              {/* componente input */}
              <ThemedTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title} //valor del input , values.title es el valor del formik
                // para cambiar el valor del initialValues={product} 
                onChangeText={handleChange("title")} // funcion cuando cambia el values.title, recuerda "title" = a tus atributo de rest , recordar q el handleChange es para inpust simples
              />

              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />

              <ThemedTextInput
                placeholder="Descripción"
                multiline //el texto contiene varias lineas
                numberOfLines={5} //numero maximo de lineas
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
              />
            </ThemedView>
            {/* componente vista */}
            <ThemedView
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                flexDirection: "row",
                gap: 10,
              }}
            >
              {/* componente input */}
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                // se formatea a string pq el value de input solo muestra texto
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              ></ThemedTextInput>
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              ></ThemedTextInput>
            </ThemedView>
            {/* componente vista */}
            <ThemedView style={{ marginHorizontal: 10 }}>
              {/* componente boton */}
              <ThemedButtonGroup
                // envio array props
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                // envio array props , del product su array sizes
                selectOptions={values.sizes}
                // metodo setear
                onSelect={(array) => {
                  // verifica si existe el array en el values.sizes
                  const newarray = values.sizes.includes(array)
                    ? // si existe lo quita
                      values.sizes.filter((index) => index !== array)
                    : // si no esta lo suma al arra ya enviado
                      [...values.sizes, array];

                  // printer
                  // console.log(newarray);

                  //seteando los sizes con el nuevo array
                  setFieldValue("sizes", newarray);
                }}
              />

              <ThemedButtonGroup
                // envio array props
                options={["kid", "men", "women", "unisex"]}
                // envio array props , del product su array gender
                selectOptions={[values.gender]}
                // actualizando el valor del values.gender , el setFieldValue es para actualizar inputs mas complejos como varias
                // opciones
                // selectedOption : es el item q recibe
                onSelect={(selectedOption) =>
                  setFieldValue("gender", selectedOption)
                }
              />
            </ThemedView>
            {/* boton para guardar */}
            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 50,
                marginTop: 20,
              }}
            >
              {/* componente boton para registrar o actualizar*/}
              <ThemedButton icon="save-outline" onPress={() => handleSubmit()}>
                Guardar
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProducScreen;
