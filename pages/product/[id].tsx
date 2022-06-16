import React, { useContext, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ProductFunctions } from '../../database'
import { IProduct } from '../../interfaces'
import { Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import ProductLayout from '../../components/layout/ProductLayout'
import { Edit, Delete } from '@mui/icons-material'
import { AuthContext } from '../../context/auth'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { ProductContext } from '../../context/product'
import { useRouter } from "next/router"
import Footer from '../../components/ui/Footer'

interface Props {
    product: IProduct
    id: string;
}




const ProductPage: React.FC<Props> = ({product, id}) => {

  const [visibility, setVisibility] = useState(false)
  const {role} = useContext(AuthContext) 
  const router = useRouter()

  const {title, description, image, price, CTADescription, CTAPaymentMethods} = product
  const {deleteProduct} = useContext(ProductContext)

  const storage = getStorage()
  


  const handleImageDelete = (url: string) => {
    const imageRef = ref(storage, `${url}`)
    try {
      deleteObject(imageRef).then(() => {
        console.log('Image successfully deleted')
      })
    } catch (error) {
      //
    }
  }

  const handleDelete = (product: IProduct, id: string) => {
    deleteProduct(product, id)
    handleImageDelete(product.image)
  }


  return (
    <ProductLayout title={`${product.type.toLocaleUpperCase()} - ${product.title}`} pageDescription={`Skeletons Socks - ${product.title.toLocaleUpperCase()}`}>
     <Grid container sx={{mt: 20}}>
        <Grid item xs={12} md={6}   sx={{paddingLeft: {xs: 0, md: '40px !important', marginBottom: '40px'}}}>
        <div className="image-container"
     style={{position: 'relative', width: '100%', height: 'auto',  margin: '0 auto'}}>

      <Card sx={{width: '100%'}}>

        <CardContent 
          sx={{height: {xs: '300px', md: '400px', lg: 'auto'}, width: '100%', objectFit: 'cover'}}
          component="img"
          src={image}
          alt={title}
          />
          {
            role === 'admin' && <span  style={{top: '7x', left: '0', width: '40px', height: '40px'}} onClick={() => setVisibility(!visibility)} className="icon"></span>
          }
        {
          visibility && 
          (
            <div className='editDelete' style={{left: '5px'}}>
              <Tooltip enterDelay={200} title="Editar">
                <IconButton onClick={()=> router.push(`/actions/update/${id}`)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip enterDelay={200} sx={{fontSize: '20px'}} title="Borrar">
                <IconButton onClick={()=> console.log("Clickeado borrar " + handleDelete(product, id))}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
      </Card>
      </div>
        </Grid>
        <Grid item xs={12} md={6}  sx={{display: 'grid', padding: '0 30px'}}>
            <Grid item  sx={{paddingLeft: {xs: 0, md: '40px !important'}}}>
            <Typography variant="h4" sx={{color: '#FF9F10', fontFamily: 'Nunito', marginBottom: '30px'}}>
              {title}
            </Typography>
            <Typography sx={{color: '#fff', fontFamily: 'Nunito', fontSize: {xs: '1.4rem', md: '1.8rem'}, marginBottom: '35px'}}>
              {description}
            </Typography>
            <Typography sx={{color: '#fff', fontFamily: 'Nunito', fontSize: {xs: '1.4rem', md: '1.8rem'}, marginBottom: '35px'}}>
              ${price}
            </Typography>
            <Typography className="product-title"  sx={{fontSize: {xs: '1rem', md: '1.2rem'}, marginBottom: '30px'}}>
              {CTADescription}
            </Typography>
            <Typography  className="product-title">
              Métodos de pago:
            </Typography>
            <Typography className="product-title">
               {CTAPaymentMethods}
            </Typography>
            </Grid>
        <Footer />
        </Grid>
     </Grid>
    </ProductLayout>
  )
}



export default ProductPage


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const slug = await ProductFunctions.getProducts() // your fetch function here 
    const ids = slug.map(el => el._id)

    return {
        paths: ids.map(id => ({
            params: {id}
        })),
        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params as {id: string}  
  
    const product = await ProductFunctions.getProductById(id)
  
  
    if(!product){
      return {
        redirect: {
          destination: `/`,
          permanent: false
        }
      }
    }
  
  
    return {
      props: {
          product: product ?? null, id
      }, revalidate: 5
    }
  }