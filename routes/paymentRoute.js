const express=require('express');
const router=express.Router();
const stripe=require("stripe")("sk_test_51I4BBrI7Rq4MvTfMyfu7E6xu2sYtiRO4vo8Jq0M6qamuwX6oHKSlITi0wVo7XMnFoZmR67AKhGKgfDY1fXSwf4Yu00LCk7SW3s")
const { v4: uuidv4 } = require('uuid');



router.post('/payment',(req,res)=>{

    const {product,token}=req.body;
    const idempotencyKey= uuidv4()
    console.log(product)
    return stripe.customers.create({
        email:token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price,
            currency:'inr',
            receipt_email:token.email
        },{idempotencyKey})
    })
    .then(result=> res.status(200).json(result))
    .catch(err=>console.log(err))
})

module.exports=router
