import { GetStaticProps } from 'next'
import { useState } from 'react'
import { ProductFunctions } from '../database'
import type { NextPage } from 'next'
import {storage} from "../firebase"

const Home: NextPage = ({data}) => {
   
  const [image, setImage] = useState<null>(null)
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [product, setProduct] = useState(
    {
      title: '',
      price: '',
      imgUrl: ''
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

  const handleImageDelete = (url: string) => {
    const fileRef = storage.refFromURL(url)
    fileRef.delete()
  }


  const handleUpload = () => {
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
            setUrl(url);
            product.imgUrl = url;
          });
      }
    );

  };
  
  console.log(data)

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input name='title' value={product.title} onChange={handleInputChange} placeholder="titulo" />
      <input name='price' value={product.price} onChange={handleInputChange} placeholder='PRECIO' />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />

      <h1>Imagenes de la DB</h1>

      {
        data.map(element => {
          return(
            <div key={element.title}>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <p>{element.price}</p>
                <img  style={{height: '200px'}} src={element.image}></img>
                <button onClick={() => handleImageDelete(element.image)}>Borrar</button>
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
  
  console.log(data)
  return {
    props: {
      data
    }
  }
}