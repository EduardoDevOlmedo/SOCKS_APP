import { db } from "."
import { IProduct } from "../interfaces"
import Product from "../models/Product"

export const getProducts = async():Promise<IProduct[]> => {
    await db.connect()
    const products = await Product.find().lean()
    
    await db.disconnect()

    return JSON.parse(JSON.stringify(products))
}

export const getProductById = async(id: string):Promise<IProduct> => {


    await db.connect()

    const productById = await Product.findById(id).lean()

    productById && await db.disconnect()

    return JSON.parse(JSON.stringify(productById))

}

export const getProductByTerm = async (term : string):Promise<IProduct[]> => {
    
    term = term.toString().toLowerCase()

    await db.connect();
   
    const products = await Product.find({
        $text: {$search: term}
    })
    .lean()

    await db.disconnect()
    
    return JSON.parse(JSON.stringify(products))

}