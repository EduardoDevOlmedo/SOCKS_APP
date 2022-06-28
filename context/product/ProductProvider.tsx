import { MergeTypeRounded } from '@mui/icons-material';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react'
import socksApi from '../../api/socksApi';
import { firebaseConfig } from '../../firebase';
import { IProduct } from '../../interfaces';
import { ProductContext } from './ProductContext';
import { ProductReducer } from './ProductReducer';
import { useSnackbar } from 'notistack';

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
const router = useRouter()

const { enqueueSnackbar} = useSnackbar();


    useEffect(() => {
     initializeApp(firebaseConfig)
    }, [])

   const refreshProducts = async() => {
        const {data} = await socksApi.get('/actions')
        dispatch({
            type: 'Product - READ',
            payload: data.products
        })
   }

   const addProduct = async(title: string, description: string, price: number, image: string, type: string,  CTADescription: string, CTAPaymentMethods: string, tags: string[]) => {
       const {data} = await socksApi.post<IProduct>("/actions", {title: title, description: description, price: price, image: image, type: type, CTADescription: CTADescription, CTAPaymentMethods: CTAPaymentMethods, tags: tags})
       dispatch({
           type: 'Product - CREATE',
           payload: data
       })
       enqueueSnackbar(`Se agregó ${title}. Se actualizará en unos segundos.`, {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    })
   }

   const updateProduct = async(product: IProduct) => {
       try {
        const {data} = await socksApi.put<IProduct>(`products/${product._id}`, {title: product.title, description: product.description, image: product.image, price: product.price, type: product.type, CTADescription: product.CTADescription, CTAPaymentMethods: product.CTAPaymentMethods, tags: product.tags})
        dispatch({
            type: 'Product - UPDATE',
            payload: data
        }) 
        router.replace("/")
        enqueueSnackbar(`Se actualizó ${product.title} correctamente. Se actualizará en unos segundos.`, {
            variant: "success",
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }
        })
       } catch (error) {
           console.log(error)
       }
   }

   const deleteProduct = async(product: IProduct, id: string) => {
    try {
        const res = await socksApi.delete("/actions", {data: {
            _Reqid: id
        }})
        dispatch({
            type: 'Product - DELETE',
            payload: product
        })
        router.replace("/")
        enqueueSnackbar(`Se borró ${product.title}. Se actualizará en unos segundos.`, {
            variant: "warning",
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }
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



