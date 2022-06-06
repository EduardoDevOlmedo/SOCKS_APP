import { GetStaticProps } from 'next'
import { useContext, useEffect, useState } from 'react'
import { ProductFunctions } from '../database'
import type { NextPage } from 'next'
import { ProductContext } from '../context/product'
import { IProduct } from '../interfaces'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'

const Home: NextPage = () => {
  
  initializeApp(firebaseConfig)

  const {products, addProduct, deleteProduct} = useContext(ProductContext)
  const [image, setImage] = useState<null>(null)
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const storage = getStorage()
  const [product, setProduct] = useState(
    {
      title: '',
      price: 0,
      imgUrl: url,
      description: '',
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
      [e.target.name]: e.target.value,
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
      const storageRef = ref(storage, `${image!['name']}`)
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
  

  const handleAdd = () => {
    addProduct(
      product.title,
      product.description,
      product.price,
      product.imgUrl,
    )
  }

  const handleDelete = (product: IProduct) => {
    deleteProduct(product)
    handleImageDelete(product.image)
  }


  return (
    <div>
      <h3>{progress}</h3>
      <br />
      <br />
      <input name='title' value={product.title} onChange={handleInputChange} placeholder="titulo" />
      <input name='description' value={product.description} onChange={handleInputChange} placeholder="descripcion" />
      <input name='price' value={product.price} onChange={handleInputChange} placeholder='PRECIO' type="number" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Subir imagen</button>
      <button onClick={handleAdd}>Añadir</button>
      <br />
      {url}
      <br />
      <img style={{height: '200px'}} src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
      <h1>Imagenes de la DB</h1>

      {
        products.map(element => {
          return(
            <div key={element.description}>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <p>{element.price}</p>
                <img  style={{height: '200px'}} src={element.image}></img>
                <button onClick={() => handleDelete(element)}>Borrar</button>
            </div>
          )
        })
      }

    </div>
  )
}

export default Home



export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await ProductFunctions.getProducts() // your fetch function here 
  
  return {
    props: {
      data
    }
  }
}