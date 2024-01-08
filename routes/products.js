const express = require('express');
const Product = require('../models/Product')
const router = express.Router();    //mini-app(instance)
const {validateProduct} = require('../middleare');

//dispalying products
router.get('/products',async (req,res)=>{
   
      try {
      
            const products =  await Product.find({});
            // console.log(products); // Log products to the console
            res.render('index', {products})
            
      } catch (error) {
            // console.log(error);
            res.render('error' ,{err:e.message})
      }
})


//displaying form to add new products
router.get('/products/new',(req,res)=>{
      try{
            
            res.render('new');
      }
       catch (error) {
      // console.log(error);
      res.render('error' ,{err:e.message})
}
})



//actually adding new products
router.post('/products',validateProduct, async (req,res)=>{
      try {
            // console.log(req)
           const {name,img,price,desc} = (req.body);
            
          await Product.create({name,img,price,desc}) //mogoose method MOdel.create to update single entity
      
      //      res.send(req.body)
         res.redirect('/products');
            
      } catch (error) {
            res.render('error',{err:e.message});
      }
})



//showing particular product
router.get('/products/:id',async (req,res)=>{
      
      try {
            const {id} = req.params;
            // console.log(req.params)
            
            const foundProduct =  await Product.findById(id).populate('reviews'); //populating 
            console.log(foundProduct)
      
            res.render('show',{foundProduct});
      } catch (error) {
            res.render('error' , {err:e.message});
      }
    

})


//edit form displaying 
router.get('/products/:id/edit',async(req,res)=>{
      try {
            const {id} = req.params;
   
            const foundProduct = await Product.findById(id);
      
            res.render('edit',{foundProduct});
      } catch (error) {
            res.render('error',{err:e.message})
      }
  

})


//actually updating form to DB 
router.patch('/products/:id', async (req,res)=>{
      try {
            const {id} = req.params;
            const {name,img,price,desc} = req.body;  //cause it apost requst as well;
      
            await Product.findByIdAndUpdate(id, {name,img,price,desc})
             
             res.redirect('/products')
      } catch (error) {
            res.render('error',{err:e.message})
      }
       

})


//delting particular product
router.delete('/products/:id', async (req,res)=>{
     
      try {
            const {id} = req.params;
      
            const foundProduct = await Product.findById(id);
      
            for(let ids of foundProduct.reviews){
                 await reviews.findByIdAndDelete(ids);
            }
      
      
            await Product.findByIdAndDelete(id)
          
            res.redirect('/products');
            
      } catch (error) {
            res.render('error',{err:e.message})
      }


})




module.exports = router;