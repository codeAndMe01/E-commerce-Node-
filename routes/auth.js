const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/register',(req,res)=>{
  
    res.render('auth/signup')

})

router.post('/register',async(req,res)=>{
   
    console.log(req.body)
    const {username,password,email,role,gender} = req.body;

    const user = new User({username,email,gender,role})

    const newUser = await  User.register(user,password);

    res.redirect('/login') 

})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})


//from passport
router.post('/login',
  passport.authenticate('local', 
  { 
    failureRedirect: '/login',
   failureMessage: true
  }),
  function(req, res) {
    
    //when we logged in we automatimaticaalu get req.user object which holds all details of user
    req.flash('success',`Welcome ${req.user.username}`)
    res.redirect('/products');
  });


 //passport
  router.get('/logout', (req, res)=>{
    req.logout(()=>{
      req.flash('success','Logged out successfully')
      res.redirect('/login');
    });
  });  

module.exports = router;