const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../models/dataBase')
const fs = require('fs')
const uploadPath = path.join('public','uploads/product')
const imageMimeTypes = ['image/jpeg','image/png','image/gif']
// const upload = multer({
//     dest:uploadPath,
//         callback(null, imageMimeTypes.includes(file.mimetype))
//     }
// })


//All sellers
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
    db.con.query("select * from Products where productId in (select productId from sellerProduct where sellerId = '"+req.user.sellerID+"') and  name REGEXP '"+val1+"' and type REGEXP '"+val2+"' and cost >= '"+val3+"' and cost<= '"+val4+"'",(err,result)=>{
        for (var i =0;i<result.length;i++)
        {
            result[i].coverImagepath = `data:${'png'};charset=utf-8;base64,${result[i].img.toString('base64')}`
        }
        res.render('sellers/index',
        {
            products: result,
            seller : "on"
        })
    })
})

router.get('/profile',checkauthenticated, (req,res)=>{
    db.con.query("select * from Sellers where mail = '"+req.user.mail+"'",async(err,result)=>{
        res.render('sellers/profile',{  seller : "on",
                                        name : result[0].name,
                                        dob  : result[0].dob,
                                        address: result[0].address,
                                        mail    : result[0].mail,
                                        phone   : result[0].phone
                                    })
    })
})

//new seller
router.get('/new',checkauthenticated, async(req,res)=>{
    res.render('sellers/new',{seller : "on"})
})

router.post('/new', async(req,res)=>{
    const cover = JSON.parse(req.body.cover)
    var val;
    if(cover != null && imageMimeTypes.includes(cover.type))
    val = new Buffer.from(cover.data,'base64')
    //product table
    db.productInsert( req.body.title,req.body.type,req.body.cost,req.body.size,0,cover.data,req.body.description,cover.type )
    //seller product
    const sqlid = "select *from Products order by ProductId desc limit 1;";
    db.con.query(sqlid,(err,result)=>{
        if(err)
        console.log(err)
        db.sellerProductInsert(result[0].productId,req.user.sellerID)
        db.inventoryInsert(req.user.sellerID,result[0].productId,req.body.quantity,0)
    });
    res.redirect('/seller')
})

function checkauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return next()
    }

    res.redirect('/loginSeller')
}

module.exports = router