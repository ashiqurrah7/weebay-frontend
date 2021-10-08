import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { INewProduct, IProduct, IUser, INewUser, IUserLogin, IEditProduct, IBuy } from "../models/commonModels";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);

        reaction(
            () => this.token,
            (token) => {
              if (token) {
                localStorage.setItem("jwt", token);
              } else {
                localStorage.removeItem("jwt");
              }
            }
          );
    }

    token: string | null = localStorage.getItem("jwt");
    user: IUser | null  = null;
    product: IProduct | null = null;
    products: IProduct[] | null = [];
    myProducts: IProduct[] | null = [];
    rented: IProduct[] | null  = [];
    bought: IProduct[] | null  = [];
    loadingUser = false;
    loadingProduct = false;
    loadingProducts = false;
    loadingMyProducts = false;
    loadingRented = false;
    loadingBought = false;
    isAuthenticated = false;


    getUser = (id:number) => {
        try{
            runInAction( async() => {
                this.loadingUser = true;
                const user =  await agent.Users.user(id);
                this.user = user;
                this.isAuthenticated =true;
                this.loadingUser = false;
            });
        }catch(error){
            throw error;
        }
    }

    login = (body:IUserLogin) => {
        try{
            runInAction( async() => {
                this.loadingUser = true;
                const user =  await agent.Users.login(body);
                this.user = user;
                console.log(user);
                localStorage.setItem("jwt", user.id.toString());
                this.isAuthenticated =true;
                this.token = user.id.toString();
                this.loadingUser = false;
            });
        }catch(error){
            throw error;
        }
    }

    register = (body:INewUser) => {
        try{
            runInAction( async() => {
                this.loadingUser = true;
                const user =  await agent.Users.register(body);
                this.user = user;
                localStorage.setItem("jwt", user.id.toString());
                this.token = user.id.toString();
                this.loadingUser = false;
            });
        }catch(error){
            throw error;
        }
    }

    editUser = (id:number, body:INewUser) => {
        try{
            runInAction( async() => {
                this.loadingUser = true;
                const user =  await agent.Users.edit(id, body);
                this.user = user;
                this.loadingUser = false;
            });
        }catch(error){
            throw error;
        }
    }

    deleteUser = (id:number) => {
        try{
            runInAction( async() => {
                this.loadingUser = true;
                const user =  await agent.Users.delete(id);
                this.user = user;
                this.loadingUser = false;
            });
        }catch(error){
            throw error;
        }
    }

    logout = () => {
        runInAction( 
            async() => {
                localStorage.removeItem("jwt");
                this.token = null;
            }
        );
    }

    getProducts = () => {
        try{
            runInAction( async() => {
                this.loadingProducts = true;
                const products =  await agent.Products.list();
                this.products = products;
                this.loadingProducts = false;
            });
        }catch(error){
            throw error;
        }
    }

    getMyProducts = (id: number) => {
        try{
            runInAction( async() => {
                this.loadingMyProducts = true;
                const myProducts =  await agent.Products.myList(id);
                console.log(myProducts);
                this.myProducts = myProducts;
                this.loadingMyProducts = false;
            });
        }catch(error){
            throw error;
        }
    }

    getProduct = (id: number) => {
        try{
            runInAction( async() => {
                this.loadingProducts = true;
                const product =  await agent.Products.product(id);
                // agent.Products.edit(id,{...product, views: product.views+1});
                // this.product = {...product, views: product.views+1};
                this.product = product;
                this.loadingProducts = false;
            });
        }catch(error){
            throw error;
        }
    }

    addProduct = (body: INewProduct) => {
        try{
            runInAction( async() => {
                this.loadingMyProducts = true;
                const product =  await agent.Products.add(body);
                this.product = product;
                this.loadingMyProducts = false;
            });
        }catch(error){
            throw error;
        }
    }

    editProduct = (id:number, body: IEditProduct) => {
        try{
            runInAction( async() => {
                this.loadingMyProducts = true;
                const product =  await agent.Products.edit(id,body);
                this.product = product;
                this.loadingMyProducts = false;
            });
        }catch(error){
            throw error;
        }
    }

    removeProduct = (id: number) => {
        try{
            runInAction( async() => {
                this.loadingMyProducts = true;
                const myProducts =  await agent.Products.remove(id);
                this.myProducts = myProducts;
                this.loadingMyProducts = false;
            });
        }catch(error){
            throw error;
        }
    }


    getBought = (id: number) => {
        try{
            runInAction( async() => {
                this.loadingBought = true;
                const bought =  await agent.Bought.list(id);
                this.bought = bought;
                this.loadingBought = false;
            });
        }catch(error){
            throw error;
        }
    }

    buy = (body: IBuy) => {
        try{
            runInAction( async() => {
                this.loadingBought = true;
                await agent.Bought.buy(body);
                this.loadingBought = false;
            });
        }catch(error){
            throw error;
        }
    }

    getRented = (id: number) => {
        try{
            runInAction( async() => {
                this.loadingRented = true;
                const rented =  await agent.Rented.list(id);
                this.rented = rented;
                this.loadingRented = false;
            });
        }catch(error){
            throw error;
        }
    }

    rent = (body: IBuy) => {
        try{
            runInAction( async() => {
                this.loadingRented = true;
                await agent.Rented.rent(body);
                this.loadingRented = false;
            });
        }catch(error){
            throw error;
        }
    }
}