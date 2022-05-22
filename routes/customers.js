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

router.get('/orders',checkauthenticated,(req,res)=>{
    db.con.query(" select * from Orders inner join Products on Products.productid = Orders.productid where customerid = '"+req.user.customerID+"'",async(err,result)=>{
        res.render('customers/orders',{seller:"off",
                                        orders:result                                
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
        res.render('customers/cart',{
                                products:result,
                                seller : "off"
                            })
    })
    
})

router.post('/cart',checkauthenticated,(req,res)=>{
    db.con.query("select * from cart as c join Products as p on c.productId=p.productId where customerId = '"+req.user.customerID+"' ",(err,result)=>{
        let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
        for(var i =0;i<result.length;i++)
        {
            db.salesInsert(req.user.customerID,result[i].productId,result[i].quantity,dateTime)
        }
    })
    db.con.query("update inventory set quantity_remaing = quantity_remaing - 1 where quantity_remaing > 0;",async (err,result)=>{})
    db.con.query("COMMIT",async (err,result)=>{});
    db.con.query("update inventory set quantity_sold = quantity_sold + 1;",async (err,result)=>{})
    db.con.query("COMMIT",async (err,result)=>{});
    db.con.query("DELETE FROM cart WHERE customerId = '"+req.user.customerID+"' ",async (err,result)=>{})
    db.con.query("COMMIT",async (err,result)=>{});
    res.redirect('/customer')
})

module.exports = router

function checkauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return next()
    }

    res.redirect('/loginCustomer')
}