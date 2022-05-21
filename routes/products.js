const express = require('express')
const router = express.Router()
const db = require('../models/dataBase')

router.get('/:id',checkauthenticated,(req,res)=>{
    db.con.query("select * from Products where productId = ?",[req.params.id],(err,result)=>{
        result[0].coverImagepath = `data:${'png'};charset=utf-8;base64,${result[0].img.toString('base64')}`
        res.render('products/productview',{seller : req.user.seller, product:result[0]})
    })
})

router.get('/:id/view',(req,res)=>{
    res.send('Product id is '+ req.params.id)
})

router.post('/:id',async(req,res)=>{
    // res.send("id : "+req.params.id+"count "+req.body.count)
    db.cartInsert(req.user.customerID,req.params.id,req.body.count)
    db.con.query("COMMIT",async (err,result)=>{});
    res.redirect('/customer/cart')
})

function checkauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return next()
    }

    res.redirect('/loginSeller')
}


module.exports = router