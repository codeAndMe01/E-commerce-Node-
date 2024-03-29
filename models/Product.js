const mongoose = require('mongoose');
const {Schema } = mongoose;

const productSchema = new Schema({
  
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId, //meaning mongoose go on diff Schema or jiska type Object Id uska yaha le aao
            ref: 'Review' 
        }
    ],
    author: {
            type:mongoose.Schema.Types.ObjectId, //meaning mongoose go on diff Schema or jiska type Object Id uska yaha le aao
            ref: 'User' 
        }
    

})
 
const Product = mongoose.model('Product',productSchema); //Product will start with caps letter and should be singular   

module.exports = Product; //export so it can be used in any other file as well