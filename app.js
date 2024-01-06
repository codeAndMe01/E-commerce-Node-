const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const seed = require('./seed');
const productRoutes = require('./routes/products');
var methodOverride = require('method-override')


const PORT = '8080'
//setting view-engine and views directory
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//middlewares
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true})) ; //to populate from data
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/e-comm')
.then(()=>{console.log('DB is connected')})
.catch((error)=>{console.log("error is :" ,error)});

// seed();  //calling cause it was function

app.use(productRoutes) //so that URl pass through this middle ware for incommng reqst

app.listen(PORT,()=>{
    console.log(`You are connected to ${PORT}`)
})