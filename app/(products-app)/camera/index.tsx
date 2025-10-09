import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function CameraScreen() {
  // logica


  // facing : indica q camara usa la frontal o trasera
  // setFacing : modifica o cambia la camara
  const [facing, setFacing] = useState<CameraType>('back');

  // para permisos
  // permission :contexto permisos
  // requestPermission : para otorgar permisos
  const [permission, requestPermission] = useCameraPermissions();


  // referencia
  // te permite acceder directamente a métodos internos del componente
  // Inicialmente vale null, pero cuando el componente <CameraView> se monta,
// Expo Camera asigna su instancia a cameraRef.current
  const cameraRef = useRef<CameraView>(null);


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
      <View style={{
        // estilos fijos 
        ...styles.container,
        // estilso extras
        marginHorizontal:30,
        justifyContent:'center',
        alignItems:'center'
      }}>
        {/* texto */}
        <Text style={styles.message}>Nesecitamos Permisos para usar la cámara y la galeria</Text>

        {/* boton  */}
        <TouchableOpacity onPress={requestPermission}>
          {/* componente para texto estilos */}
          <ThemedText type='subtitle'>
            Solicitar Permiso
          </ThemedText>
        </TouchableOpacity>

        {/* boton */}
        {/* <Button onPress={requestPermission} title="grant permission" /> */}
      </View>
    );
  }


  // método de Expo Camera para capturar una imagen
  const onShuterButtonPress = async()=>{
    // si la cámara no está lista, salimos
    if(!cameraRef.current) return;

    // metodo capturar imagen y Devuelve un objeto con información de la foto, por ejemplo:
    const picture = await cameraRef.current.takePictureAsync({
      quality:0.7 //calidad
    });

    console.log(picture);
// si no hay URI (foto inválida), salimos
    if( !picture?.uri) return;
  }




  // funcion toma el estado actual de la cámara
  function toggleCameraFacing() {
    // Toma el estado actual de la cámara (facing)
    // Si está en 'back' (trasera), la cambia a 'front' (frontal).
    // Si está en 'front', la cambia a 'back'.
    // invierte la cámara cada vez que presionas el botón.
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  // renderizado la camara osea la vista
  return (
    // vista
    <View style={styles.container}>
      {/* camara Es el   componente de cámara de expo*/}
      <CameraView
      // Le pasas el ref={cameraRef} para poder acceder a sus métodos (como takePictureAsync).
      ref={cameraRef} 
       style={styles.camera} facing={facing} />
  
      {/* vista abajo para el boton*/}
        {/* componente boton abajo */}
        {/* onPress={onShuterButtonPress} : ejecuta la foto */}
        <ShutterButton onPress={onShuterButtonPress}/>

        {/* boton  */}
        {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}> */}
          {/* texto */}
          {/* <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity> */}
    </View>
  );
}



// componente boton abajo
const ShutterButton = ({onPress = ()=>{}})=>{
  // logica
  // para calcular dimension a medida q cambia
  const dimensions = useWindowDimensions();
  // {"fontScale": 1, "height": 914.2857142857143, "scale": 2.625, "width": 411.42857142857144}
  // console.log(dimensions)

  // hook para mostrar segun el tema
  const primaryColor =useThemeColor({},'primary');

  // renderizado
  return(
    // boton
    <TouchableOpacity
    onPress={onPress}
    style={[
      // estilos fijos
      styles.shutterButton,
      // agregando mas estilos
      {
        position:'absolute',
        bottom:30,
        // centrando
        left:dimensions.width /2 -32,
        borderColor:primaryColor
      }
    ]}
    >
    </TouchableOpacity>
  )
}




// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});