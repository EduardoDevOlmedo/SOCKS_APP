import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import Product from '../../../models/Product';

type Data =  
|{message: string}
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getProductByTitle(req, res)
        default:
            break;
    }

}

const getProductByTitle = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const {q} = req.query;
   
    if(q.length === 0) return res.status(400).json({message: 'Bad request'})

    const products = await Product.find({
        $text: {$search: q.toString()}
    }).lean()

    return res.status(202).json(products)
}