
let allLikeBtn = document.querySelectorAll('.like-btn');


async function likeButton(productId,btn){

    try{
        const response = await axios({
            method:'post',
            url:`/products/${productId}/like`,
            headers:{'X-Requested-With' : 'XMLHttpRequest'}
        }) 

        if(btn.children[0].classlist.contains('fa-regular')){
           console.log("likle") 
        }


        console.log(response)
    }
    catch(e){
        if(e.response.status==400){
            window.location.replace('/login');
            console.log(e.message,"this is window error")
        }
    }
    
     
}

for(let btn of allLikeBtn){
    btn.addEventListener('click',()=>{
      
        let productId = btn.getAttribute('product-id');
    
        likeButton(productId,btn)
    })
}