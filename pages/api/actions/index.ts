import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import Product from '../../../models/Product';
import { IProduct } from '../../../interfaces';

type Data = {
   message?: string;
   products?: IProduct[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
       case 'GET':
           return getProducts(req, res)
       case 'POST':
            return postProduct(req, res)  
        case 'DELETE':
            return deleteEntry(req, res)
       default:
           break;
   }
}

const getProducts  =async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connect()
        const products = await Product.find()
        await db.disconnect()
        res.status(200).json({products})
        return products
    } catch (error) {
        await db.disconnect()
        res.status(400).json({message: 'Could not get the products. ' + error})
    }
}

const postProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {


    const {title = "", description = "", price = "", image = "", type = "", CTADescription = "", CTAPaymentMethods = ""} = req.body
 
    const newProduct = new Product({
        title, 
        description,
        price,
        image,
        type,
        CTADescription, 
        CTAPaymentMethods
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

const deleteEntry =  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {_Reqid = ""} = req.body

    if(!_Reqid) return res.status(406).json({message: `Method not accepted. Check the request body params: ${JSON.stringify(req.body)}`})

    try {
        await db.connect()
        const entries = await Product.find().sort({createdAt: 'ascending'})
        const ProductId = entries.map(product  => product._id!.toString() === _Reqid && product._id!.toString())
                        .filter(entry => entry !== false)
        await Product.deleteOne({_id: ProductId.toString()})
        await db.disconnect()
        res.status(201).json({message: `The following ID has been succesfully deleted: ${ProductId}`})
    } catch (error) {
        await db.disconnect()
        res.status(400).json({message: `Something went wrong, please try again using one of the available ID's.  ${error}`})
    }
}

