if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodoverride = require('method-override')

const indexRouter = require('./routes/index')
const sellerRouter = require('./routes/sellers')
const customerRouter = require('./routes/customers')
const productRouter = require('./routes/products')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use( expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended : false}))
app.use(bodyParser.urlencoded({ limit: '10mb', extended:false }))
app.use(methodoverride('_method'))
app.use(flash())
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',indexRouter)
app.use('/seller',sellerRouter)
app.use('/customer',customerRouter)
app.use('/product',productRouter)

app.listen(process.env.PORT||3000)