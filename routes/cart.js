const express = require("express");
const { isLoggedIn } = require("../middleare");
const User = require("../models/User");
const Product = require("../models/Product");
const router = express.Router();
const stripe = require('stripe')('sk_test_51ObillSIxM2nKesChzmRzNan7xXo4iFbbZCji34CqXVnU7qrwY33tg40SYuTjk001jRo2rmipzqxWK1faFONfGC900pnFyLimj');


router.get("/user/cart", isLoggedIn, async (req, res) => {
  const userID = req.user._id;

  let user = await User.findById(userID).populate("cart");
  const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);

  res.render("cart/cart", { user, totalAmount });
});



router.post("/user/:id/add", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const userID = req.user._id;
  let user = await User.findById(userID);

  const product = await Product.findById(id);

  user.cart.push(product); //we are pushing entire product but only product id will go beacuse of condition in userSchema
  await user.save();

  req.flash("success", "Product has been added to your cart");
  res.redirect("/user/cart");
});



router.post("/user/:id/remove", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const userID = req.user._id;
  let user = await User.findById(userID);

  const product = await Product.findById(id);

  if (user.cart.includes(id)) {
    const removeProduct = user.cart.indexOf(id);

    if (removeProduct !== -1) {
      user.cart.splice(removeProduct, 1);
      await user.save();
      req.flash("error", "Product has been removed from cart");
    }
  }

  res.redirect("/user/cart");
});


router.get('/success',(req,res)=>{
  res.render('stripe/success');
})

router.get('/cancel',(req,res)=>{
  res.render('stripe/cancel');
})


router.get('/checkout/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('cart');
    //  console.log(userId);
    //  console.log(req.user._id)
    const totalAmount = user.cart.reduce((accumulator,curr)=> accumulator + curr.price,0)
     const prices =  user.cart.map((item )=>item.price);

     
     
   const customer = await stripe.customers.create({
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
  }); 




  const session = await stripe.checkout.sessions.create({
    
    customer : customer.id,

    // {
    //   price_data: {
    //     currency: 'INR',
    //     product_data: {
    //       name: 'T-shirt',
    //     },
    //     unit_amount: prices[0]*100,
    //   },
    //   quantity: 1,
    // },
     line_items : user.cart.map((item) => ({
      price_data: {
        currency: 'INR',
        product_data: {
          name: item.name,  // Replace with the actual property that holds the product name
        },
        unit_amount: item.price * 100,  // Replace with the actual property that holds the product price
      },
      quantity: 1,  // You may adjust the quantity based on your requirements
    })),
    
    mode: 'payment',
    
    success_url: 'http://localhost:8080/success',
    cancel_url: 'http://localhost:8080/cancel',
  });

  res.redirect(303, session.url);
});


module.exports = router;






