const express = require('express');
const { isLoggedIn } = require('../../middleare');
const User = require('../../models/User');
const router = express();

router.post('/products/:id/like',isLoggedIn,async (req,res)=>{
    const {id} = req.params;
     
     const user = req.user;
     const isLiked = user.wishlist.includes(id);

     
     if(isLiked){
         await User.findByIdAndUpdate(req.user._id , {$pull: {wishlist:id}})
        }
        else{
            await User.findByIdAndUpdate(req.user._id , {$addToSet: {wishlist:id}})
    }

    //its an AJAX requste though it is not require to send response
    // res.send(isLiked) 
})


module.exports = router