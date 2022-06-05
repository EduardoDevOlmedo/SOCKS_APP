import mongoose, {Model, Schema} from "mongoose";
import { IProduct } from "../interfaces";

const productSchema = new Schema({
    title:  {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
})

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model('Product', productSchema );


export default Product
