const express = require('express');
const Product = require('../models/Product')
const router = express.Router();    //mini-app(instance)

//dispalying products
router.get('/products',async (req,res)=>{
   
      try {
      
            const products =  await Product.find({});
            // console.log(products); // Log products to the console
            res.render('index', {products})
            
      } catch (error) {
            // console.log(error);
            res.status(500).send("Internal error")
      }
})


//displaying form to add new products
router.get('/products/new',(req,res)=>{
      res.render('new');
})



//actually new products
router.post('/products', async (req,res)=>{
      // console.log(req)
     const {name,img,price,desc} = (req.body);
      
    await Product.create({name,img,price,desc}) //mogoose method MOdel.create to update single entity

//      res.send(req.body)
   res.redirect('/products');
})



//showing particular product
router.get('/products/:id',async (req,res)=>{
      
      const {id} = req.params;
      // console.log(req.params)
      
      const foundProduct =  await Product.findById(id)
      // console.log(foundProduct)

      res.render('show',{foundProduct});

})


//edit form displaying 
router.get('/products/:id/edit',async(req,res)=>{
      const {id} = req.params;
   
      const foundProduct = await Product.findById(id);

      res.render('edit',{foundProduct});

})


//actually updating form to DB 
router.patch('/products/:id', async (req,res)=>{
       
      const {id} = req.params;
      const {name,img,price,desc} = req.body;  //cause it apost requst as well;

      await Product.findByIdAndUpdate(id, {name,img,price,desc})
       
       res.redirect('/products')
})


//delting particular product
router.delete('/products/:id', async (req,res)=>{
     
      const {id} = req.params;

      await Product.findByIdAndDelete(id)
    
      res.redirect('/products');

})




module.exports = router;