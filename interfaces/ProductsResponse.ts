import { IProduct } from ".";

export interface ProductsResponse {
        products: IProduct[];
        quantity: string | number;
}