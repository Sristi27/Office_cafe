const express=require('express');
const router=express.Router();
const stripe=require("stripe")("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3")
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
