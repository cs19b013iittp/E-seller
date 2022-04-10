const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const users = []
const passport = require('passport')
const methodoverride = require('method-override')
const initializePassport = require('../passport-config.js')
initializePassport(
    passport,
    email=>users.find(user => user.email === email),
    id=>users.find(user => user.id === id)
)

router.get('/',checkauthenticated,(req,res)=>{
    res.render('index', {val: req.user.seller})
})

router.get('/login',checknotauthenticated,(req,res)=>{
    res.render('login.ejs')
  })

router.post('/login',checknotauthenticated, passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

router.get('/register',checknotauthenticated,(req,res)=>{
    res.render('register.ejs')
})

router.post('/register',checknotauthenticated,async(req,res)=>{
    try{
        const hashedpassword = await bcrypt.hash(req.body.password ,10)
        console.log(typeof(req.body.seller))
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedpassword,
            dob:req.body.dob,
            address:req.body.address,
            phone:req.body.phone,
            seller:req.body.seller
        })
        res.redirect('/login')
    }
    catch{
        res.redirect('/register')
    }
})
  
router.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/login')
})

function checkauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return next()
    }

    res.redirect('/login')
}

function checknotauthenticated(req,res,next){
    if(req.isAuthenticated( ))
    {
        return res.redirect('/')
    }

    next()
}

module.exports = router