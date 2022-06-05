import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import Product from '../../../models/Product';
import {storage} from "../../../firebase"

type Data = {
   message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
       case 'POST':
            return postImage(req, res)   
       default:
           break;
   }
}

const postImage = async(req: NextApiRequest, res: NextApiResponse<Data>) => {


    const {title = "", description = "", price = "", image = ""} = req.body
 
    const newProduct = new Product({
        title, 
        description,
        price,
        image
    })


    try {
        await db.connect()
        await newProduct.save()
        await db.disconnect()
        return res.status(201).json({message: 'Se agregó el producto correctamente: ' + newProduct})
    } catch (error) {
        await db.disconnect()
        return res.status(400).json({message: 'an error ocurred '+ error})
    }

}