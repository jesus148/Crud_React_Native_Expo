import { SecureStorageAdapter } from "@/helpers/adapters/secury-storage.adapter";
import axios from "axios";
import { Platform } from "react-native";
// instancia de axios
// base url osea la base del api

// Esto sirve para saber en qué entorno está corriendo la app.
const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

// puerto del pc donde esta el back externo corriendo con docker 
export const API_URL =
  STAGE === "prod" //si estas producccion
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios" //si es ios
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID; //si es android , poner tu ip

//  LOG  {"android": "http://192.168.100.5:3000/api", "stage": "dev"}
// console.log({
//   stage: STAGE,
//   [Platform.OS]: API_URL,
// });

const productsApi = axios.create({
  // baseURL:'localhost:3000/api'

  // base url de tu pc para el backend
  baseURL: API_URL,
});


// intercetor osea cade vez q en toda tu app hagas una request esto se envia
productsApi.interceptors.request.use(async(config)=>{

  // obtiene el token
  const token = await SecureStorageAdapter.getitem('token');

  // existe token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  // retorna
  return config
})


export { productsApi };

// explicacion : Porque en React Native, cuando estás en desarrollo, las URLs de backend pueden variar:
