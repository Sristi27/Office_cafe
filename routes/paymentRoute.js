const express=require('express');
const router=express.Router();
const stripe=require("stripe")("pk_test_51I4BBrI7Rq4MvTfMGre90OlhjGhOU437gSTOsMPej95Fw5RlaAfrSxvZvOJBMca2hdALVeFIhRg4wZ5QNtRTJbiN00saYUUbK7")
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
