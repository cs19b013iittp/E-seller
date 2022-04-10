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

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "bari6b71rrwpyfiae707-mysql.services.clever-cloud.com",
    user: "uvxbu2dzgz9l85ar",
    password: "c2UeNnyyh9aj5OBiLY05"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
  });

app.use('/',indexRouter)
app.use('/seller',sellerRouter)

app.listen(process.env.PORT||3000)