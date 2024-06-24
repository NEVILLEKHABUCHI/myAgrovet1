const mongoose=require('mongoose');

//Product schema for the products collection in mongoDB
const productSchema=new mongoose.Schema({
    productImage:String,
    productName:String,
    productPrice:Number,
    productQuantity:Number,
    productCategory:String//Store image data as Base64 string
});

// Cart schema for handling the cart
const cartSchema=new mongoose.Schema({
    userId: String,
    products: [{
        productImage: String,
        productName: String,
        productPrice: Number
    }]
})

const Product=mongoose.model('products',productSchema);
const Cart=mongoose.model('Cart',cartSchema);

module.exports={Product,Cart};

