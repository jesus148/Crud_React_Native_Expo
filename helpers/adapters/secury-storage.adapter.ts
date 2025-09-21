
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
export class SecureStorageAdapter{

    // CLASE PARA GUARDAR O ALMACENAR INFORMACION SENSIBLE COMO TOKEN.ETC



    // metodo para setear o guardar el token mediante una key
    static async setItem(key:string, value:string){
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            Alert.alert('Error', 'Failed to save data')
        }
    }

    // obteniendo el token x una key
    static async getitem(key:string){
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            Alert.alert('Error', 'Failed to get data');
            return null;
        }
    }

    // eliminando el token
    static async deleteitem(key:string){
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to delete data')
        }
    }

}