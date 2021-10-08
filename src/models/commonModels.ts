export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    email: string;
    phone: string;
    password: string;
    name: string;
    address:string;
}

export interface INewUser {
    email: string;
    phone: string;
    password: string;
    name: string;
    address:string;
}

export interface IProduct {
    id: number;
    user_id: number;
    title: string;
    categories: string;
    desc: string;
    price: number;
    rentRate: number;
    rentInterval: string;
    views: number;
    created_at: string;
}

export interface INewProduct {
    user_id: number;
    title: string;
    categories: string;
    desc: string;
    price: number;
    rentRate: number;
    rentInterval: string;
}

export interface IEditProduct {
    user_id: number;
    title: string;
    categories: string;
    desc: string;
    price: number;
    rentRate: number;
    rentInterval: string;
    views: number;
}

export interface IBuy{
    user_id: number,
    product_id: number
}