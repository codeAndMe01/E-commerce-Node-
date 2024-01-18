const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const seed = require('./seed');
const methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/User');

//routes
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const productAPI = require('./routes/API/productAPI');



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



//session & flash
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } commented cause its for https(s = secure) and we use htpp when we are not hoisting on live server
   cookie:{  
    httpOnly:true,
    expires:Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000     
   }
}))

app.use(flash());


//using passprt-local-mongoose make sure this should after the session 
app.use(passport.initialize());  //though passport and session are diffrent package doing somthing to mix it  
app.use(passport.session());



// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));


//using after the flash cause we want flash to work on it 
app.use((req,res,next)=>{
  res.locals.currentUser = req.user //seting user in local so that we can get it in entire login session
  res.locals.success = req.flash('success') 
  res.locals.error = req.flash('error')
  
  next();
  
})


// seed();  //calling cause it was function

app.use(productRoutes) //so that URl pass through this middle ware for incommng reqst
app.use(reviewRoutes) 
app.use(authRoutes)
app.use(productAPI)

app.listen(PORT,()=>{
    console.log(`You are connected to ${PORT}`)
})