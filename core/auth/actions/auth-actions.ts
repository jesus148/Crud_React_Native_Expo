
import { productsApi } from "../api/productsApi";
import { User } from "../interface/user";


// METODOS API REST

// modelo de response del rest loging
// > en el postaman > http://localhost:3000/api/auth/login
// > en el body abajo > simbolo de copy
//  > en el editor > f1 >  paste json as code > poner nombre > y enter
//   > y sale el modelo osea la clase modelo del response

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

// metodo de retorno
const returnUserToken = (data: AuthResponse) => {
  // usuario clase modelo con token
  const { id, email, fullName, isActive, roles, token } = data;

  // usuario clase modelo sin token
  const user: User = {
    // los valores de arriba son iguales , se ponen aqui eso lo hace .js
    id,
    email,
    fullName,
    isActive,
    roles,
  };

  // retornando
  return {
    user, //usuario
    token, //token
  };
};

// metodo de logeo
export const authLogin = async (email: string, password: string) => {
  // email convierte minuscula
  email = email.toLowerCase();

  try {
    // metodo rest api
    // <AuthResponse> : es lo devuelve
    const { data } = await productsApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    // formateo el retorno de mi response
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};

// metodo verificar el estado
export const authCheckStatus = async () => {
  try {
    // metodo api rest
    // <AuthResponse> : es lo devuelve
    const { data } = await productsApi.get<AuthResponse>("/auth/check-status");

    // formateo el retorno de mi response
    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};
