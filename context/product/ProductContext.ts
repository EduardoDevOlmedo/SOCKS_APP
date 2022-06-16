import { createContext } from 'react';
import { IProduct } from '../../interfaces';


interface contextProps{
    products: IProduct[];
    refreshProducts: () => Promise<void>;
    addProduct: (title: string, description: string, price: number, image: string, type: string, CTADescription: string, CTAPaymentMethods: string) => Promise<void>; 
    updateProduct: (product: IProduct) => Promise<void>
    deleteProduct: (product: IProduct, id: string) => Promise<void>
}

export const ProductContext = createContext({} as contextProps)