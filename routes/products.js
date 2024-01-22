const express = require("express");
const router = express.Router(); //mini-app(instance)
const Product = require("../models/Product");
const Review = require("../models/Review");
const {
  validateProduct,
  isLoggedIn,
  isSeller,
  isProductAuthor,
} = require("../middleare");
const User = require("../models/User");

//dispalying products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products); // Log products to the console
    res.render("index", { products });
  } catch (e) {
    // console.log(error);
    res.render("error", { err: e.message });
  }
});

//displaying form to add new products
router.get("/products/new", isLoggedIn, isSeller, (req, res) => {
  try {
    res.render("new");
  } catch (e) {
    // console.log(error);
    res.render("error", { err: e.message });
  }
});

//actually adding new products
router.post(
  "/products",
  isLoggedIn,
  isSeller,
  validateProduct,
  async (req, res) => {
    try {
      // console.log(req)
      const { name, img, price, desc } = req.body;

      await Product.create({ name, img, price, desc, author: req.user._id }); //mogoose method MOdel.create to update single entity

      req.flash("success", "New Product added successfully");

      res.redirect("/products");
    } catch (e) {
      res.render("error", { err: e.message });
    }
  }
);

//showing particular product
router.get("/products/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params)

    const foundProduct = await Product.findById(id).populate("reviews"); //populating
    // console.log(foundProduct)

    res.render("show", { foundProduct, success: req.flash("msg") });
    // msg: req.flash('msg')
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

//edit form displaying
router.get(
  "/products/:id/edit",
  isLoggedIn,
  isSeller,
  isProductAuthor,
  async (req, res) => {
    try {
      const { id } = req.params;

      const foundProduct = await Product.findById(id);

      res.render("edit", { foundProduct });
    } catch (error) {
      res.render("error", { err: e.message });
    }
  }
);

//actually updating form to DB
router.patch(
  "/products/:id",
  isLoggedIn,
  isSeller,
  isProductAuthor,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, img, price, desc } = req.body; //cause it apost requst as well;

      await Product.findByIdAndUpdate(id, { name, img, price, desc });
      req.flash("success", "New details added successfully"); // Setting flash msg
      res.redirect("/products");
    } catch (e) {
      res.render("error", { err: e.message });
    }
  }
);

//delting particular product
router.delete(
  "/products/:id",
  isLoggedIn,
  isSeller,
  isProductAuthor,
  async (req, res) => {
    try {
      let { id } = req.params;
      const product = await Product.findById(id);

      for (let id of product.reviews) {
        await Review.findByIdAndDelete(id);
      }

      for (let item of req.user.wishlist) {
        //removing that product from wishList
        if (item == id) {
          const updateUser = await User.findByIdAndUpdate(req.user._id, {
            $pull: { wishlist: item },
          });
        }
      }

      for (let item of req.user.cart) {
        //removing that product from cart
        if (item == id) {
          const productIdToRemove = item;

          // Use $pull to remove the specified product ID from the 'cart' array

          const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            $pull: { cart: productIdToRemove },
          });
        }
      }

      // console.log(req.user.cart)

      await Product.findByIdAndDelete(id);
      req.flash("success", "Product deleted successfully");
      res.redirect("/products");
    } catch (e) {
      res.render("error", { err: e.message });
    }
  }
);

module.exports = router;
