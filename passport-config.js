const LocalStratagy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./models/dataBase')

function initialize(passport)
{
    const authenticateseller = async (req,email, password,done) =>{
        db.con.query("select * from Sellers where mail = '"+email+"'",async(err,result)=>{
            if(err)
            return done(err)
            if(!result.length )
            return done(null, false ,{message : "No user with that email"})
            if(await bcrypt.compare(password, result[0].password)){
                return done(null,result[0])
            }
            else
            {
                return done(null, false, {message :" Password incorrect"})
            }
        });
    }
    const authenticatecustomer = async (req,email, password,done) =>{
        db.con.query("select * from Customers where mail = '"+email+"'",async(err,result)=>{
            if(err)
            return done(err)
            if(!result.length )
            return done(null, false ,{message : "No user with that email"})
            
                if(await bcrypt.compare(password, result[0].password)){
                    return done(null,result[0])
                }
                else
                {
                    return done(null, false,{message: " Password incorrect"})
                }
            
        });
    }
    passport.use('local-seller',new LocalStratagy({ usernameField: 'email',passReqToCallback : true}, authenticateseller))
    passport.use('local-customer',new LocalStratagy({ usernameField: 'email',passReqToCallback : true}, authenticatecustomer))
    passport.serializeUser((user,done)=>{ done(null,user)})
    passport.deserializeUser((user,done)=>{ done(null,user)})
}

module.exports = initialize