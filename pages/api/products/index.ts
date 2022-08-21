import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import Product from '../../../models/Product';

type Data = 
|{message: string}
| {
    products: IProduct[];
    quantity: string | number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)    
        default:
            break;
    }
}

export const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect()
    const products = await Product.find().lean().limit(Number(req.query!.quantity!))
    await db.disconnect()

    const response = {
        products,
        quantity: await Product.count()
    }

    res.status(200).json(response)
}