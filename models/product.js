const mongoose=require('mongoose');

//Product schema for the products collection in mongoDB
const productSchema=new mongoose.Schema({
    productImage:String,
    productName:String,
    productPrice:Number,
    productQuantity:Number,
    productCategory:String//Store image data as Base64 string
});

const Product=mongoose.model('products',productSchema);

module.exports=Product;

