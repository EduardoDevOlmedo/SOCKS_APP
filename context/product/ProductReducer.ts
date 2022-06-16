import { IProduct } from "../../interfaces";
import { ProdState } from "./ProductProvider";

type ProductType = 
|{ type: "Product - CREATE", payload: IProduct}
|{ type: "Product - READ", payload: IProduct[]} 
|{ type: "Product - UPDATE", payload: IProduct}
|{ type: "Product - DELETE", payload: IProduct}



export const ProductReducer = (state: ProdState, action: ProductType):ProdState => {
    
    switch (action.type) {
        case 'Product - READ' :
            return {
                ...state, 
                products: [...action.payload]
            }
        case 'Product - CREATE':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'Product - UPDATE':
            return {
                ...state,
                products: state.products.map(product => {
                    if(product._id === action.payload._id){
                        product.title = action.payload.title
                        product.description = action.payload.description
                        product.price = action.payload.price
                        product.image = action.payload.image
                        product.type = action.payload.type
                        product.CTADescription = action.payload.CTADescription,
                        product.CTAPaymentMethods = action.payload.CTAPaymentMethods
                    }
                    return product
                })
            }
        case 'Product - DELETE':
                return {
                    ...state,
                    products: state.products.filter(product => {
                       return product._id !== action.payload._id
                    })
                }
        default:
            return state;
    }


}