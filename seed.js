const mongoose = require('mongoose');
const Product = require('./models/Product')

const product = [
    {
        name:"I-Phone" ,
        img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1381&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:120000,
        desc: "Good a very handy phone"

    },
    {
        name: "Candle",
        img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:120,
        desc: "A candle that can lighten up you "

    },
    {
        name:"Watch",
        img:"https://images.unsplash.com/photo-1568618617636-d4b33f34f383?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        price:500000,
        desc: "Pure Gold plated watch "

    },
];


async function seedDB(){
    await Product.insertMany(product); //InsertMAny accept array and this process  return Promise

    console.log("DB seeded")
}


module.exports = seedDB;
