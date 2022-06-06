import { useEffect, useReducer } from 'react'
import socksApi from '../../api/socksApi';
import { IProduct } from '../../interfaces';
import { ProductContext } from './ProductContext';
import { ProductReducer } from './ProductReducer';


export interface ProdState {
   products: IProduct[];
}

const PRODUCTS_INITIAL_STATE : ProdState = {
    products: []
}



interface Props {
    children: JSX.Element[] | JSX.Element
}

const ProductProvider: React.FC<Props> = ({children}) => {

const [state, dispatch] = useReducer(ProductReducer, PRODUCTS_INITIAL_STATE)

   const refreshProducts = async() => {
        const {data} = await socksApi.get('/actions')
        dispatch({
            type: 'Product - READ',
            payload: data.products
        })
   }

   const addProduct = async(title: string, description: string, price: number, image: string) => {
       const {data} = await socksApi.post<IProduct>("/actions", {title: title, description: description, price: price, image: image})
       dispatch({
           type: 'Product - CREATE',
           payload: data
       })
   }

   const updateProduct = async(product: IProduct) => {
       try {
        const {data} = await socksApi.put<IProduct>(`products/${product._id}`, {title: product.title, description: product.description, image: product.image, price: product.price})
        dispatch({
            type: 'Product - UPDATE',
            payload: data
        }) 
        console.log('product updated ' + product)
       } catch (error) {
           console.log(error)
       }
   }

   const deleteProduct = async(product: IProduct) => {
       try {
        const res = await socksApi.delete("/actions", {data: {
            _Reqid: product._id 
        }})
        dispatch({
            type: 'Product - DELETE',
            payload: product
        })
       } catch (error) {
            throw new Error('An error has occurred ' + error)
       }
   }
    

   useEffect(() => {
        refreshProducts()
   }, [state.products])

    return (
        <ProductContext.Provider value={{
            ...state, refreshProducts, addProduct, updateProduct, deleteProduct
        }}>
           {
               children
           }
        </ProductContext.Provider>
    )
}
export default ProductProvider



