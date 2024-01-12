const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const seed = require('./seed');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');
const methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/e-comm')
.then(()=>{console.log('DB is connected')})
.catch((error)=>{console.log("error is :" ,error)});


const PORT = '8080'
//setting view-engine and views directory
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//middlewares
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true})) ; //to populate from data
app.use(methodOverride('_method'))

//to use session middlware effectively getting inside an variable 


//session & flash
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } commented cause its for https and we use htpp when we are not hoisting on live server
}))

app.use(flash());

//using after the flash cause we flash to work on it 
app.use((req,res,next)=>{
  res.locals.success = req.flash('success') 
  res.locals.error = req.flash('error')
  
  next();
  
})


// seed();  //calling cause it was function

app.use(productRoutes) //so that URl pass through this middle ware for incommng reqst
app.use(reviewRoutes) 

app.listen(PORT,()=>{
    console.log(`You are connected to ${PORT}`)
})