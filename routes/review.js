const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review')
const {validateReview} = require('../middleare')
const router = express.Router();


router.post('/products/:id/review',validateReview, async (req,res)=>{
      
    try {
        const {rating,comment} = req.body;
        const {id} = req.params;
    
        const product = await Product.findById(id);
    
        //this is class syntax so we have to save model in end in createOne || createMany 
        // mongoose dosent require to save 
        const review = new Review({rating,comment}); //new review creating in Review Schema 
         
        product.reviews.push(review);
     
        product.save();   //cause there would be chaneg in product model 
        review.save();   //cause there would be chaneg in review model 
     
            
        res.redirect(`/products/${id}`)
    } catch (error) {
        res.render('error',{err:e.message});
    }


})


module.exports = router;