import mongoose, { Schema, model, Model } from 'mongoose';

import { IProduct } from "../interfaces";

const productSchema = new Schema({
    title:  {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    CTADescription: {type: String, required: true}, 
    CTAPaymentMethods: {type: String, required: true},
    tags: {type: Array, required: true}
})


productSchema.index({title: 'text', tags: 'text'})


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema );



export default Product
