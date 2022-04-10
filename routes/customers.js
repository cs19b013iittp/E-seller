const express = require('express')
const router = express.Router()

//All customers
router.get('/',(req,res)=>{
    res.render('customers/index')
})

//new customers
router.get('/new',(req,res)=>{
    res.render('customers/new')
})

router.post('',(req,res)=>{
    res.send('Create')
})

module.exports = router