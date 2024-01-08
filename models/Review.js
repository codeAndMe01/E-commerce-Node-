const mongoose = require('mongoose');
const {Schema} = mongoose;


const reviewSchema = new Schema({

     rating:{
        type:Number,
        min:0,
        max:5,
     },
     comment:{
        type:String,
        trim:true
    }
   
},
{ timestamps:true }
)


const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;