import { db } from "."
import Product from "../models/Product"

export const getProducts = async():Promise<any[]> => {
    await db.connect()
    const products = await Product.find().select("image title description price -_id").lean()
    await db.disconnect()

    return products
}