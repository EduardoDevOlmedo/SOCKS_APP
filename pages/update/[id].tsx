import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { firebaseConfig, storage } from '../../firebase'
import { ProductContext } from '../../context/product'

interface Props {
  product: IProduct
  id: string;
}

const UpdatePage:React.FC<Props> = ({product, id}) => {
  
  
  initializeApp(firebaseConfig)

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
      image: ''
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

  const handleInputChange = (e: any) => {
    setnewProduct({
      ...product,
      [e.target.name]: e.target.value,
      _id: id
    })
  }

  const handleImageDelete = (url: string) => {
    console.log(url)
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
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
            setUrl(url)
              setnewProduct({
                ...newProduct,
                image: url ? url : product.image
            })
        });;
        }
      );
     
    } catch (error) {
      console.log(error)   
    }
   
   
  };

  const handleEdit = () => {
    updateProduct(newProduct)
    Router.push("/")
    if(url === '') return;
    handleImageDelete(product.image)
  }

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
          <input name='title' value={newProduct.title} onChange={handleInputChange} placeholder="titulo" />
          <input name='description' value={newProduct.description} onChange={handleInputChange} placeholder="descripcion" />
          <input name='price' value={newProduct.price} onChange={handleInputChange} placeholder='PRECIO' type="number" />
          <input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Editar imagen</button>
          <button onClick={handleEdit}>Editar</button>
      <br />
      {url}
      <br />
      <img style={{height: '200px'}} src={product.image || "http://via.placeholder.com/300"} alt="firebase-image" />
      // NUEVA IMAGEN
      <img style={{height: '200px'}} src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
    </div>
  )
}

export default UpdatePage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { ProductFunctions } from '../../database'
import { IProduct } from '../../interfaces'
import Router from 'next/router'
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as {id: string}  // your fetch function here 

  const product = await ProductFunctions.getProductById(id)

  console.log(product)

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