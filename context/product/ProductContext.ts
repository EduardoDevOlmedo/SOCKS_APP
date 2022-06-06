import { createContext } from 'react';
import { IProduct } from '../../interfaces';


interface contextProps{
    products: IProduct[];
    refreshProducts: () => Promise<void>;
    addProduct: (title: string, description: string, price: number, image: string) => Promise<void>; 
    updateProduct: (product: IProduct) => Promise<void>
    deleteProduct: (product: IProduct) => Promise<void>
}

export const ProductContext = createContext({} as contextProps)