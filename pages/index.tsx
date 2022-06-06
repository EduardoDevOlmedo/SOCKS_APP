import { GetStaticProps } from 'next'
import { useContext, useEffect, useState } from 'react'
import { ProductFunctions } from '../database'
import type { NextPage } from 'next'
import {storage} from "../firebase"
import { ProductContext } from '../context/product'
import { IProduct } from '../interfaces'

const Home: NextPage = () => {
   
  const {products, addProduct, deleteProduct} = useContext(ProductContext)
  const [image, setImage] = useState<null>(null)
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [product, setProduct] = useState(
    {
      title: '',
      price: 0,
      imgUrl: url,
      description: ''
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
    const fileRef = storage.refFromURL(url)
    fileRef.delete()
  }




  const handleUpload = () => {
    try {
      const uploadTask = storage.ref(`images/${image!['name']}`).put(image);
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
          storage
            .ref("images")
            .child(image!['name'])
            .getDownloadURL()
            .then(url => {
              setUrl(url)
              setProduct({
                ...product,
                imgUrl: url
              })
            });
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
      product.imgUrl
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