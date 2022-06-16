import { db } from "."
import { IProduct } from "../interfaces"
import Product from "../models/Product"

export const getProducts = async():Promise<IProduct[]> => {
    await db.connect()
    const products = await Product.find().lean().select('image price title description type CTADescription CTAPaymentMethods _id')
    await db.disconnect()

    return JSON.parse(JSON.stringify(products))
}

export const getProductById = async(id: string):Promise<IProduct> => {


    await db.connect()

    const productById = await Product.findById(id).lean().select('image price title description type CTADescription CTAPaymentMethods _id')

    await db.disconnect()

    return JSON.parse(JSON.stringify(productById))

}