// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import Product from '../../models/Product'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>) {

    const images = [
      {
        image: "https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen.jpg"
      },
      {
        image: "https://josefacchin.com/wp-content/uploads/2020/02/como-quitar-el-fondo-de-una-imagen.png"
      }
    ]
    await db.connect()

    await Product.deleteMany()
    await Product.insertMany(images)
    
    await db.disconnect()

    res.status(200).send({message: 'Proceso realizado.'})

}
