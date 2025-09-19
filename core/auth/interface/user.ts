
// clase modelo de mi user sin token 
// esto recordar la clase modelo de user cuando te logeas sin usar el token
export interface User {
    id:string, 
    email: string, 
    fullName : string, 
    isActive:boolean, 
    roles:string[]
}