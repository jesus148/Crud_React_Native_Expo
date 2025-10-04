
// CLASE MODELO PARA PRODUCTOS EN GENERAL
// en tu postaman > http://localhost:3000/api/products?limit=5&offset=10 > copia el body abajo
// aca en vscode > f1 > jsonascode > Product


export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       string[];
    gender:      string;
    tags:        string[];
    images:      string[];
    user:        User;
}

export interface User {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
}
