import { Grid, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button, Chip } from "@mui/material";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProductLayout from "../../components/layout/ProductLayout";
import { ProductContext } from "../../context/product";



type formData = {
      title: string;
      price: number;
      imgUrl: string;
      description: string;
      type: string;
      CTADescription: string;
      CTAPaymentMethods: string;
}

const AddPage: NextPage = () => {
  
  const router = useRouter()

  const storage = getStorage()

  const {addProduct} = useContext(ProductContext)

  const [wasClicked, setWasClicked] = useState(false)

  const {handleSubmit, register, formState: {errors}} = useForm<formData>()

  const [image, setImage] = useState<null>(null)
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false)

  const [product, setProduct] = useState(
    {
      title: '',
      price: 0,
      imgUrl: url,
      description: '',
      type: '',
      CTADescription: '',
      CTAPaymentMethods: ''
    }
  )


  const handleChange = (e: any) => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }    
  }

  const handleInputChange = (e: any) => {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      })
  }


  useEffect(() => {
    
    handleUpload()
  
  }, [image])
  

  
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
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
            setUrl(url)
              setProduct({
                ...product,
                imgUrl: url
            })
        });;
        }
      );
     
    } catch (error) {
      console.log(error)   
    }
    
  };

  useEffect(() => {

    if(product.type === '' || product.imgUrl === '') {
      setError(true)
    } else {
      setError(false)
    }
    
  }, [product.type, product.imgUrl])
  

  const handleAdd = (data: formData) => {
    
    if(product.type === '' || product.imgUrl === '') {
      return;
    } else {
      setError(false)
      addProduct(
        data.title,
        data.description,
        data.price,
        product.imgUrl,
        product.type,
        data.CTADescription,
        data.CTAPaymentMethods
      )
  
      router.replace("/")
    }
    
  }
  
 
  


  return (
    <ProductLayout title="Subir" pageDescription='Subir producto'>
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
            onClick={() => setWasClicked(true)}
            className="typography"
            htmlFor="img">Subir Foto</label>
           {
              wasClicked && <Typography>{progress}%</Typography> 
           }
          </div>
            {
              image && (
                <img 
            width={'100%'}
            height={'440px'}
            style={{objectFit: 'cover'}}
            src={product.imgUrl}></img>
              )
            }
            </Box>
        </Grid>
        <Grid sx={{
          marginTop: '40px'

        }} item xs={12} md={6} >
          <form onSubmit={handleSubmit(handleAdd)} className="formControl">
            <Typography variant="h4">¿Qué subirás?</Typography>
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
              <RadioGroup onChange={handleInputChange} value={product.type} row
                sx={{width: 'fit-content', margin: '0 auto'}}
                aria-labelledby="radio-buttons-group-label" defaultValue="Calcetín" name="type">
                <FormControlLabel disableTypography
                value="calcetin" control={<Radio sx={{color: '#FF9F10 !important'}} />} label="Calcetín" />
                <FormControlLabel disableTypography
                value="puntera" control={<Radio sx={{color: '#FF9F10 !important'}} />} label="Puntera" />
              </RadioGroup>
            <div style={{marginTop: '20px'}}>
            <TextField 
            placeholder='Título'
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
            placeholder='Descripción'
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
            placeholder='Precio'
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
            placeholder='Descripción CTA'
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
            placeholder='CTA - Métodos de pago'
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
             <Button variant="contained" type='submit' sx={{
        background: '#FF9F10',
        margin: '40px auto',
        width: 'fit-content',
        fontFamily: 'Nunito',
        color: '#080808',
        borderRadius: '20px'
      }}>Agregar</Button>
            </div>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </ProductLayout>
  )
}

export default AddPage



