const { findById } = require('./models/User');
const {productSchema , reviewSchema} = require('./schema');
const Product = require('./models/Product');


const validateProduct = (req,res,next)=>{
    let {name , img , price , desc} = req.body;
    const {error} = productSchema.validate({name , img , price , desc})
    if(error){
        const msg =  error.details.map((err)=>err.message).join(',')
        return  res.render('error' , {err:msg})
    }
    next();
}

const validateReview = (req,res,next)=>{
    let {rating , comment} = req.body;
    const {error} = reviewSchema.validate({rating , comment})
    if(error){
        const msg =  error.details.map((err)=>err.message).join(',')
        return  res.render('error' , {err:msg})
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
   
    if(!req.isAuthenticated()){   //isAuthenticated return true if login else false static method from passport
       
        req.flash('error','You need to login first');
        return res.redirect('/login');
    }

    next();
}

const isSeller = (req,res,next)=>{
    
    const {id} = req.params;

   if(!req.user.role){
     req.flash('error','You don\'t have permission to do it')
     res.redirect('/products');
    }else if(req.user.role !== 'seller'){
       req.flash('error','You don\'t have permission to do it')
       res.redirect(`/products/${id}`);
   }
   next();

}

const isProductAuthor = async (req,res,next)=>{
    const {id} = req.params;
    
    const product = await Product.findById(id);
     
    // console.log('id', id)
    // console.log('product', product.author)
    // console.log('req.user', req.user._id)

    if(!product.author.equals(req.user._id)){
        req.flash('error','You are not the owner of that product')
       return  res.redirect(`/products`);
    }
   
   next();
}



module.exports = {validateProduct , validateReview, isLoggedIn, isSeller, isProductAuthor}
