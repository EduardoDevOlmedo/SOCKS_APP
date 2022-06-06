import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import Product from '../../../models/Product';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    console.log(req.query)
    
    switch (req.method) {
        case 'PUT':
            return updateProduct(req, res) 
        default:
            break;
    }
}

const updateProduct =  async(req: NextApiRequest, res: NextApiResponse<Data>)  => {
    const {id = ""} = req.query

    await db.connect()
    
    const productToUpdate = await Product.findById(id)

    if(!productToUpdate) {
        await db.disconnect()
        return res.status(404).json({message: 'ID was not found'})
    }

    const {
        title = productToUpdate.title,
        description = productToUpdate.description,
        price = productToUpdate.price,
        image = productToUpdate.image
    } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {title, description, price, image}, {runValidators: true, new: true})
        await db.disconnect()
        return res.status(201).json({message: 'Product was updated ' + updatedProduct})
        
    } catch (error) {
        await db.disconnect()
        res.status(400).json({message: `Something went wrong, please try again using one of the available ID's.  ${error}`})
    }
}