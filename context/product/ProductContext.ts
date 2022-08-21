import { createContext } from 'react';
import { IProduct } from '../../interfaces';


interface contextProps{
    products: IProduct[];
    refreshProducts: () => Promise<void>;
    addProduct: (title: string, description: string, price: number, image: string, type: string, CTADescription: string, CTAPaymentMethods: string, tags: string[]) => Promise<void>; 
    updateProduct: (product: IProduct) => Promise<void>
    deleteProduct: (product: IProduct, id: string) => Promise<void>;
    productsAmount: number;
    loadMoreProducts: (factor: number) => void;
}

export const ProductContext = createContext({} as contextProps)