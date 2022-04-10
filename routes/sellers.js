const express = require('express')
const router = express.Router()

//All sellers
router.get('/',(req,res)=>{
    res.render('sellers/index')
})

//new seller
router.get('/new',(req,res)=>{
    res.render('sellers/new')
})

router.post('',(req,res)=>{
    res.send('Create')
})

module.exports = router