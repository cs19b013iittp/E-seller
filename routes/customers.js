const express = require('express')
const router = express.Router()
const db = require('../models/dataBase')

//All customers
router.get('/',checkauthenticated,(req,res)=>{
    var val1 = req.query.name;
    var val2 = req.query.type;
    var val3 = req.query.mincost;
    var val4 = req.query.maxcost;
    if(val1===undefined||val1==='')
    val1 = ".*"
    if(val2===undefined||val2==='')
    val2 = ".*"
    if(val3===undefined||val3==='')
    val3 = 0
    if(val4===undefined||val4==='')
    val4 = 9999
    db.con.query("select * from Products where name REGEXP '"+val1+"' and type REGEXP '"+val2+"' and cost >= '"+val3+"' and cost<= '"+val4+"'",(err,result)=>{
        for (var i =0;i<result.length;i++)
        {
            result[i].coverImagepath = `data:${'png'};charset=utf-8;base64,${result[i].img.toString('base64')}`
        }
        res.render('customers/index',
        {
            products: result,
            seller : "off"
        })
    })
})

router.get('/profile',checkauthenticated,(req,res)=>{
    db.con.query("select * from Customers where mail = '"+req.user.mail+"'",async(err,result)=>{
        res.render('customers/profile',{  seller : "off",
                                        name : result[0].name,
                                        dob  : result[0].dob,
                                        address: result[0].address,
                                        mail    : result[0].mail,
                                        phone   : result[0].phone
                                    })
    })
})

//new customers
router.get('/cart',checkauthenticated,(req,res)=>{
    db.con.query("select * from cart as c join Products as p on c.productId=p.productId where customerId = '"+req.user.customerID+"' ",(err,result)=>{
        console.log(result)
        res.render('customers/cart',{
                                products:result,
                                seller : "off"
                            })
    })
    
})

module.exports = router

function checkauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return next()
    }

    res.redirect('/loginCustomer')
}