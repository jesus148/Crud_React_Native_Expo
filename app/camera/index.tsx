import ButonCamera from "@/presentation/products/components/butonCamera";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


// VISTA CAMARA
// recordar no forma parte de ningun layaout de stack 
// por ende cubre toda la vista

export default function CameraScreen() {
  // logica


  // importando el contexto de zustand
  const {addSelectImage}= useCameraStore();

  // facing : indica q camara usa la frontal o trasera
  // setFacing : modifica o cambia la camara
  const [facing, setFacing] = useState<CameraType>("back");

  // para permisos
  // permission :contexto permisos , el estado actual del permiso
  // requesCameratPermission : para otorgar permisos
  // para cambiar el nombre selecciona el requesCameratPermission > f2 y ponle otro nombre
  const [permission, requesCameratPermission] = useCameraPermissions();


  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  // donde se guarda la imagen al tomar la foto para luega mostrarla
  const [selectImage, setSelectImgae] = useState<string>();

  // referencia
  // te permite acceder directamente a métodos internos del componente
  // Inicialmente vale null, pero cuando el componente <CameraView> se monta,
  // Expo Camera asigna su instancia a cameraRef.current
  const cameraRef = useRef<CameraView>(null);





  // metodo para otorgar permisos para usar la camara
  const OnRequestPermissions = async() =>{
    try {
      // Aquí se ejecuta la función requesCameratPermission().
      // Retorna un objeto con información del permiso.
      // Usas desestructuración para obtener solo la propiedad status, y la renombras a cameraPermissionStatus.
      const {status: cameraPermissionStatus} = await requesCameratPermission();
      // Si el permiso no fue concedido ('granted'), muestras una alerta y terminas la función con return.
      if(cameraPermissionStatus != 'granted'){
        Alert.alert('lo siento','Nesecitamos permiso a la camara para tomar fotos.')
        return;
      }


      const {status: mediaPermissions} = await requesCameratPermission();
      if(mediaPermissions != 'granted'){
        Alert.alert('lo siento','Nesecitamos permiso a la galeria para tomar fotos.')
        return;
      }

    } catch (error) {
      console.log(error)
      Alert.alert('error','algo salio mal')
    }
  }






  // los permisos se estan cargando,muestra vacio
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  // si no tiene permisos
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      // vista
      <View
        style={{
          // estilos fijos
          ...styles.container,
          // estilso extras
          marginHorizontal: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* texto */}
        <Text style={styles.message}>
          Nesecitamos Permisos para usar la cámara y la galeria
        </Text>

        {/* boton  */}
        <TouchableOpacity onPress={OnRequestPermissions}>
          {/* componente para texto estilos */}
          <ThemedText type="subtitle">Solicitar Permiso</ThemedText>
        </TouchableOpacity>

        {/* boton */}
        {/* <Button onPress={requestPermission} title="grant permission" /> */}
      </View>
    );
  }

  // método de Expo Camera para capturar una imagen
  const onShuterButtonPress = async () => {
    // si la cámara no está lista, salimos
    if (!cameraRef.current) return;

    // metodo capturar imagen y Devuelve un objeto con información de la foto, por ejemplo:
    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7, //calidad
    });

    // si no hay URI (foto inválida), salimos
    if (!picture?.uri) return;

    // lo guarda la imagene en la variale
    setSelectImgae(picture.uri);
  };

  // funcion para voltear la camara
  function toggleCameraFacing() {
    //  logica

    // Toma el estado actual de la cámara (facing)
    // Si está en 'back' (trasera), la cambia a 'front' (frontal).
    // Si está en 'front', la cambia a 'back'.
    // invierte la cámara cada vez que presionas el botón.
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // metodo para componente boton salir camara
  const onReturnCancel = () => {
    router.dismiss();
  };

  // metodo para guardar la imagen tomada
  const onPictureAccepted =async () => {
    // verifca si esta la imagen guardada
    if(!selectImage) return;

    // toma la imagen y la guarda en la galeria de google del android
    // VERIFICAR AHI
    await MediaLibrary.createAssetAsync(selectImage);

    // guardando la foto en el contexto de zustand
    addSelectImage(selectImage);

    // regresa a la anterior osea la anterior q lo llamo vista
    router.dismiss();
  };

  // metodo para resetear la imagen guardada
  const onRetakePhoto = () => {
    setSelectImgae(undefined);
  };




  // metodo para abrir la galeria
  const onPickImages = async()=>{
    // Aquí se está abriendo la galería del teléfono y configurando cómo se debe comportar. 
    const result = await ImagePicker.launchImageLibraryAsync({
      // Define qué tipo de archivos puede seleccionar el usuario. En este caso: solo imágenes
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // Comprime la imagen antes de devolverla. Va de 0 (muy comprimido, baja calidad) a 1 (sin compresión). 0.5 es un buen punto medio.
      quality:0.5,
      // Solo tiene efecto si allowsEditing está en true. Define la proporción del recorte: [4,3] significa un rectángulo horizontal (como una foto típica).
      aspect:[4,3],
      // Si está true, abre una interfaz para recortar o ajustar la imagen antes de seleccionarla.
      // allowsEditing:true,
      // seleccionar varios archvios
      allowsMultipleSelection:true , 
      // limite de seleccionados files
      selectionLimit:5
    });

    // Si el usuario presiona “Cancelar” o cierra la galería sin elegir nada
    if(result.canceled) return;


    // agregando o seteando las imagenes elegidas y agregandolas 
    //  a mi contexto
    // asset : es el array con las img
    result.assets.forEach((img)=>{
      // uri : es la url en string o el formato
      addSelectImage(img.uri)
    })

    // console.log(result.assets);
    
    // retrocede a la ultima vista que la llamo
    router.dismiss();

  }







  // VISTA cuando se setea la imagen osea cuando toma la img para mostrar
  // debe existir
  if (selectImage) {
    return (
      <View style={styles.container}>
        {/* se muestra la imagen */}
        <Image source={{ uri: selectImage }} style={styles.camera} />

        {/* componente boton medio abajo para guardar */}
        <ButonCamera onPress={onPictureAccepted} posicion="confirm" iconName="checkmark-outline" />

        {/* componente boton abajo derecha para cancelar y no guarda la img tomada */}
        <ButonCamera
          onPress={onRetakePhoto}
          posicion="cancel"
          iconName="close-outline"
        />

        {/* componente boton arriba izquierda para regresar o salir  */}
        <ButonCamera
          onPress={onReturnCancel}
          posicion="cancel2"
          iconName="arrow-back-outline"
        />
      </View>
    );
  }

  // VISTA PRINCIPAL CAMARA********************
  // renderizado la camara osea la vista
  return (
    // vista
    <View style={styles.container}>
      {/* camara Es el   componente de cámara de expo*/}
      <CameraView
        // Le pasas el ref={cameraRef} para poder acceder a sus métodos (como takePictureAsync).
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />

      {/* vista abajo para el boton*/}
      {/* componente boton abajo centro */}
      {/* onPress={onShuterButtonPress} : ejecuta la foto */}
      <ButonCamera
        onPress={onShuterButtonPress}
        posicion="center"
        centered={true}
      />

      {/* componente abajo derecha para para voletar camara */}
      <ButonCamera
        onPress={toggleCameraFacing}
        iconName="camera-reverse-outline"
        posicion="flip"
      />

      {/*componente boton para ver galeria la parte de abajo izuierda */}
      <ButonCamera posicion="galery" iconName="image-outline" onPress={onPickImages} />

      {/* componente arriba para salir de la camara */}
      <ButonCamera
        onPress={onReturnCancel}
        posicion="cancel"
        iconName="arrow-back-outline"
      />
    </View>
  );
}

// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
