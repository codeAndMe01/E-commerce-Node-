const express = require("express");
const { isLoggedIn } = require("../middleare");
const User = require("../models/User");
const Product = require("../models/Product");
const router = express.Router();

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

  req.flash("error", "Product has been removed from cart");
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

// router.delete('/user/:id/add',isLoggedIn,async (req,res){
//       const {id} = req.params;

//

// })

module.exports = router;
