import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GetServerSideProps } from "next";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProductLayout from "../../../components/layout/ProductLayout";
import { ProductContext } from "../../../context/product";
import { ProductFunctions } from "../../../database";
import { IProduct } from "../../../interfaces";


interface Props {
  product: IProduct
  id: string;
}

type formData = {
  title: string;
  price: number;
  imgUrl: string;
  description: string;
  type: string;
  CTADescription: string;
  CTAPaymentMethods: string;
  tags: string;
}


const UpdatePage:React.FC<Props> = ({product, id}) => {
  

  const {handleSubmit, register, formState: {errors}} = useForm<formData>()
  const [error, setError] = useState(false)

  const storage = getStorage()
  const {updateProduct} = useContext(ProductContext)
  const [image, setImage] = useState<null>(null)
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [newProduct, setnewProduct] = useState<IProduct>(
    {
      _id: '',
      title: '',
      description: '',
      price: 0,
      image: '',
      type: '',
      CTADescription: '',
      CTAPaymentMethods: '',
      tags: []
    }
  )

  useEffect(() => {
    setnewProduct({
      ...product,
      _id: id
    })
  }, [])
  

  const handleChange = (e: any) => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }    
  }

  useEffect(() => {
    
    handleUpload()
  
  }, [image])

  const handleInputChange = (e: any) => {
    setnewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
      _id: id
    })
  }

  const handleImageDelete = (url: string) => {

    const imageRef = ref(storage, `${url}`)
    try {
      deleteObject(imageRef).then(() => {
        console.log('Image successfully deleted')
      }) 
    } catch (error) {
      console.log(error)
    }
  }


  const handleUpload = () => {
   
    try {
      const storageRef = ref(storage, `images/${image!['name']}`)
      const uploadTask = uploadBytesResumable(storageRef, image!)
      
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
            setUrl(url)
              setnewProduct({
                ...newProduct,
                image: url ? url : newProduct.image
            })
        });;
        }
      );
     
    } catch (error) {
      console.log(error)   
    }
   
   
  };

  useEffect(() => {

    console.log(product.tags)

    if(product.type === '' || product.image === '') {
      setError(true)
    } else {
      setError(false)
    }
    
  }, [])

  const handleEdit = (data: formData) => {    
    

    
    updateProduct({
      _id: newProduct._id,
      title: data.title,
      description: data.description,
      price: data.price,
      image: newProduct.image,
      CTADescription: data.CTADescription,
      CTAPaymentMethods: data.CTAPaymentMethods,
      type: newProduct.type,
      tags: data.tags.split(",").map(el => el.toLowerCase())
    })
    if(url === '') return;
    handleImageDelete(product.image);
    
  }

  return (
    <ProductLayout title="Editar" pageDescription='Editar producto'>
      <Grid container>
        <Grid sx={{
          marginTop: '40px'
        }} item xs={12} md={6} >
            <Box sx={{border: '3px dashed white', 
             width: {xs: '290px', md:'420px'},
             margin: '0 auto',
             height: '500px',
             textAlign: 'center',
            display: 'grid',
            placeContent: 'center',
             }}>
          <div>
            <input onChange={handleChange} accept="image/png,image/jpeg,image/jpg" type="file" name="uploadfile" id="img" style={{display: 'none'}}/>
            <label 
            className="typography"
            htmlFor="img">Editar Foto</label>
            <Typography>{progress}%</Typography> 
          </div>
                <img 
            width={'100%'}
            height={'440px'}
            style={{objectFit: 'cover'}}
            src={newProduct.image ? newProduct.image : product.image}></img>
            </Box>
        </Grid>
        <Grid sx={{
          marginTop: '40px'

        }} item xs={12} md={6} >
          <form onSubmit={handleSubmit(handleEdit)} className="formControl">
            <Typography variant="h4">Editar </Typography>
            <FormControl
              sx={{
                fontFamily: 'Nunito',
                fontSize: '23px',
                marginTop: '20px',
                paddingLeft: '30px'
              }}
            >
              {
                error && <Chip color="error" label="Todos los campos son requeridos."/>
              }
              <RadioGroup onChange={handleInputChange} value={newProduct.type} row
                sx={{width: 'fit-content', margin: '0 auto'}}
                aria-labelledby="radio-buttons-group-label" defaultValue={product.type} name="type">
                <FormControlLabel disableTypography
                value="calcetin" control={<Radio sx={{color: '#FF9F10 !important'}} />} label="Calcetín" />
                <FormControlLabel disableTypography
                value="puntera" control={<Radio sx={{color: '#FF9F10 !important'}} />} label="Puntera" />
              </RadioGroup>
            <div style={{marginTop: '20px'}}>
            <TextField 
            defaultValue={product.title}
             sx={{width: '90%', 
             margin: '0 auto',
             color: '#fff',
             fontFamily: 'Nunito',
             borderBottom: '3px solid #707070'
           }}
           error={!!errors.title}
           helperText={errors.title?.message}
           {
            ...register("title", {
              required: 'El título es requerido',
            })
           }
            />
             <TextField  
            defaultValue={`${product.description}`} 
            error={!!errors.description}
           helperText={errors.description?.message}
            {
             ...register("description", {
               required: 'La descripción es requerida',
             })
            }
             sx={{width: '90%', 
             margin: '0 auto',
             color: '#fff',
             fontFamily: 'Nunito',
             borderBottom: '3px solid #707070'
           }}
            />
             <TextField 
             type="numher"
             defaultValue={`${product.price}`}
            error={!!errors.price}
           helperText={errors.price?.message}
            {
             ...register("price", {
               required: 'El precio es requerido',
             })
            }
             sx={{width: '90%',  
             margin: '0 auto',
             color: '#fff',
             fontFamily: 'Nunito',
             borderBottom: '3px solid #707070'
           }}
            />
             <TextField  
            defaultValue={`${product.CTADescription}`}
            error={!!errors.CTADescription}
            helperText={errors.CTADescription?.message}
            {
             ...register("CTADescription", {
               required: 'La descripción del CTA es requerida',
             })
            }
             sx={{width: '90%', 
             margin: '0 auto',
             color: '#fff',
             fontFamily: 'Nunito',
             borderBottom: '3px solid #707070'
           }}
            />
             <TextField  
            defaultValue={`${product.CTAPaymentMethods}`}
            error={!!errors.CTAPaymentMethods}
            helperText={errors.CTAPaymentMethods?.message}
            {
              ...register("CTAPaymentMethods", {
                required: 'Los tipos de pago son requeridos.',
              })
             }
             sx={{width: '90%', 
             margin: '0 auto',
             color: '#fff',
             fontFamily: 'Nunito',
             borderBottom: '3px solid #707070'
           }}
            />
             <TextField  
            defaultValue={`${product.tags}`} 
            error={!!errors.tags}
            helperText={errors.tags?.message}
            {
              ...register("tags", {
                required: 'Escriba al menos una etiqueta.',
              })
             }
             sx={{width: '90%', 
             margin: '0 auto',
             color: '#fff',
             fontFamily: 'Nunito',
             borderBottom: '3px solid #707070'
           }}
           />
             <Button variant="contained" type='submit' sx={{
        background: '#FF9F10',
        margin: '40px auto',
        width: 'fit-content',
        fontFamily: 'Nunito',
        color: '#080808',
        borderRadius: '20px'
      }}>Editar</Button>
            </div>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </ProductLayout>
  )
}

export default UpdatePage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as {id: string}  // your fetch function here 

  const product = await ProductFunctions.getProductById(id)


  if(!product){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: {
        product, id
    }
  }
}