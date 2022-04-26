const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const users = []
const db = require('../models/dataBase.js')
//import {sellerInsert} from '../models/dataBase.js'
const passport = require('passport')
const methodoverride = require('method-override')
const initializePassport = require('../passport-config.js')
initializePassport(
    passport
)

router.get('/',checkauthenticated,(req,res)=>{
    res.render('index', {seller: req.user.seller})
})

router.get('/loginSeller',checknotauthenticated,(req,res)=>{
    res.render('loginseller.ejs',{seller:"on"})
  })

router.post('/loginSeller',checknotauthenticated, passport.authenticate('local-seller',{
    successRedirect:'/',
    failureRedirect:'/loginSeller',
    failureFlash:true
}))

router.get('/loginCustomer',checknotauthenticated,(req,res)=>{
    res.render('logincustomer.ejs',{seller:"off"})
  })

router.post('/loginCustomer',checknotauthenticated, passport.authenticate('local-customer',{
    successRedirect:'/',
    failureRedirect:'/loginCustomer',
    failureFlash:true
}))

router.get('/register',checknotauthenticated,(req,res)=>{
    res.render('register.ejs',{seller:"on"})
})

router.post('/register',checknotauthenticated,async(req,res)=>{
    try{
        const hashedpassword = await bcrypt.hash(req.body.password ,10)
        if(req.body.seller==="Seller")
        {
            db.sellerInsert(req.body.name,req.body.email,hashedpassword,req.body.dob,req.body.phone,req.body.address)
            res.redirect('/loginSeller')
        }
        else if(req.body.seller==="Customer")
        {
            db.customerInsert(req.body.name,req.body.email,hashedpassword,req.body.dob,req.body.phone,req.body.address)
            res.redirect('/loginCustomer')
        }
        
    }
    catch{
        res.redirect('/register')
    }
})
  
router.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/loginCustomer')
})

function checkauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return next()
    }

    res.redirect('/loginCustomer')
}

function checknotauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return res.redirect('/')
    }

    next()
}

module.exports = router