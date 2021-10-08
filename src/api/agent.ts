import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { INewProduct, IProduct, IUser, INewUser, IUserLogin, IEditProduct, IBuy } from "../models/commonModels";


axios.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
      toast.error("Network error -- make sure API server is running");
      console.log(error);
    }
    console.log(error);
    const { status, data } = error;
  
    if (error.status === 401) {
        toast.error("Data is unauthorized");
    }
    if (status === 500) {
      toast.error("Server Error");
    }
    throw error.response;
  });

axios.defaults.baseURL = "http://localhost:3000/api/v1";

const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body, config).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body, config).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
};

const Users = {
    user : (id: number): Promise<IUser> => request.get(`/users/${id}`),
    register: (body: INewUser): Promise<IUser> => request.post(`/users`, body),
    edit: (id: number, body: INewUser): Promise<IUser> => request.put(`/users/${id}`, body),
    login: (body: IUserLogin):Promise<IUser> => request.post(`/user/login`, body),
    delete: (id: number) => request.del(`/users/${id}`)
}
const Products = {
    list : (): Promise<IProduct[]> => request.get('/products',),
    product: (id: number): Promise<IProduct> => request.get(`/products/${id}`),
    myList : (id: number): Promise<IProduct[]> => request.get(`/products/user/${id}`),
    add: (body: INewProduct): Promise<IProduct> => request.post(`/products`, body),
    edit: (id:number, body: IEditProduct): Promise<IProduct> => request.put(`/products`, body),
    remove : (id: number) => request.del(`/products/user/${id}`)
}
const Bought = {
    list : (id: number): Promise<IProduct[]> => request.get(`/boughts/${id}`),
    buy: (body: IBuy): Promise<IProduct> => request.post(`/boughts`, body)
}
const Rented = {
    list : (id: number): Promise<IProduct[]> => request.get(`/renteds/${id}`),
    rent: (body: IBuy): Promise<IProduct> => request.post(`/rented`, body),
}

const agent = { Users, Products, Bought, Rented};

export default agent;
