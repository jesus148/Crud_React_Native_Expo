import { authCheckStatus, authLogin, registrer } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secury-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

// CONTEXTO GENERAL ZUSTAND

// clase modelo
export interface AuthState {
  // atributos
  status: AuthStatus;
  token?: string;
  user?: User;
  //   metodos
  login: (email: string, password: string) => Promise<boolean>; //retorna booleano
  checkStatus: () => Promise<void>; //no retornan nada
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>; //retorna boolean
// metodo registro
  registrerUser:(email:string, password:string, fullName:string) => Promise<boolean>; 
}

// estado con zustand
// set : para setear data
// get :obtener data
export const useAuthStore = create<AuthState>()((set, get) => ({
  // properties
  status: "checking",
  token: undefined,
  user: undefined,

  // actions

  //   metodo cambia estado
  changeStatus: async (token?: string, user?: User) => {
    // si esta vacio
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      // eliminado token
      await SecureStorageAdapter.deleteitem("token");
      return false;
    }

    // setea hay valor
    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    // guardar o seteas el token
    await SecureStorageAdapter.setItem("token", token);

    return true;
  },

  // metodo logueo
  login: async (email: string, password: string) => {
    // 1 ejemplo
    // metodo rest de axios
    // const resp = await authLogin(email, password);

    // si la response es false
    // if (!resp) {
    //   // setea estado
    //   set({ status: "unauthenticated", token: undefined, user: undefined });
    //   return false;
    // }

    // si la respuesta es true , seteando el estado
    // set({
    //   status: "authenticated",
    //   token: resp.token,
    //   user: resp.user,
    // });

    // return true;

    // 2 ejemplo
    const resp = await authLogin(email, password); //metodo rest
    return get().changeStatus(resp?.token, resp?.user); //llama al metodo cambia estado
  },


  // metodo registro
  registrerUser:async(email:string, password:string, fullName:string)=>{
    // metodo rest
    const resp = await registrer(email , password,fullName );
    // console.log(resp);

    // retorna Boolean
    return resp? true : false;
  },

  // metodo para verificar estado
  checkStatus: async () => {
    // cuando se logea deja entrar solo test
    // if(get().user){
    //   return;
    // }

    // metodo rest de axios
    // debes enviar el token como interceptero con axios lo hace auto
    const resp = await authCheckStatus(); //metodo rest

    // 1 ejemplo
    // si la response es false
    // if (!resp) {
    //   // setea estado
    //   set({ status: "unauthenticated", token: undefined, user: undefined });
    //   return;
    // }

    // // si la respuesta es true , seteando el estado
    // set({
    //   status: "authenticated",
    //   token: resp.token,
    //   user: resp.user,
    // });

    // return;

    // 2 ejemplo
    get().changeStatus(resp?.token, resp?.user); //llama al metodo cambia estado
  },

  // metodo para cerrar sesion
  logout: async () => {
    // eliminado token
    SecureStorageAdapter.deleteitem("token");

    // setea estado
    // osea actualiza el estado x ende te bota de la sesion
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
