import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
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
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>; //no retornan nada
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => boolean; //retorna boolean
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
  changeStatus: (token?: string, user?: User) => {
    // si esta vacio
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });

      return false;
    }

    // setea hay valor
    set({
      status: "authenticated",
      token: token,
      user: user,
    });

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
    return get().changeStatus(resp?.token , resp?.user); //llama al metodo cambia estado
  },



  // metodo para verificar estado
  checkStatus: async () => {


    // cuando se logea deja entrar solo test
    // if(get().user){
    //   return;
    // }

    // metodo rest de axios
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
     get().changeStatus(resp?.token , resp?.user); //llama al metodo cambia estado
  },

  // metodo para cerrar sesion
  logout: async () => {
    // setea estado
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
