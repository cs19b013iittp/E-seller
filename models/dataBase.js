
var mysql = require('mysql');
  var db_config = {
    host: "bari6b71rrwpyfiae707-mysql.services.clever-cloud.com",
    user: "uvxbu2dzgz9l85ar",
    password: "c2UeNnyyh9aj5OBiLY05"
  };
  
  var con;
  con = mysql.createConnection(db_config);

  con.query("use bari6b71rrwpyfiae707")
//  Insert Functions
   function sellerInsert(name,mail,password,dob,phone,address){
     sqlInsert = "INSERT INTO Sellers (name,password,dob,phone ,mail,address,seller) VALUES (?,?,?,? ,?,?,?)"
      con.query(sqlInsert,[name,password,dob,phone,mail,address,"on"],(err,result)=>{
        if(err)
        console.log(err)
        else
        console.log("success",result)
      })
  }
   function customerInsert(name,mail,password,dob,phone,address){
    sqlInsert = "INSERT INTO Customers (name,password,dob,phone ,mail,address,seller) VALUES (?,?,?,? ,?,?,?)"
    con.query(sqlInsert,[name,password,dob,phone,mail,address,"off"],(err,result)=>{
      if(err)
      console.log(err)
      else
      console.log("success",result)
    })
  }
   function sellerProductInsert(productid,sellerid){
    sqlInsert = "INSERT INTO sellerProduct (productid,sellerid) VALUES (?,?)"
    con.query(sqlInsert,[productid,sellerid],(err,res)=>{
      if(err)
      console.log(err)
      else
      console.log("success productseller",res)
    })
  }
   function inventoryInsert(sellerid,productid,quantityRemaining,quantitySold){
    sqlInsert = "INSERT INTO inventory (sellerid,productid,quantity_remaing,quantity_sold) VALUES (?,?,?,?)"
    con.query(sqlInsert,[sellerid,productid,quantityRemaining,quantitySold],(err,res)=>{
      if(err)
      console.log(err)
      else
      console.log("success productseller",res)
    })
  }
   function productInsert(name,type,cost,size,rating,img,description,imgtype){
    sqlInsert = "INSERT INTO Products (name,type,cost ,size,rating,img,description,imgtype) VALUES (?,?,?,?,?,?,?,?)"
    con.query(sqlInsert,[name,type,cost,size,rating,img,description,imgtype],(err,res)=>{
      if(err)
      console.log(err)
      else
      console.log("success product",res)
    })
  }
   function salesInsert(customerid,productid,quantity){
    sqlInsert = "INSERT INTO sellerProduct (customerid,productid,quantity) VALUES (?,?,?)"
  }
   function cartInsert(customerid,productid,quantity){
     con.query("select * from cart where customerid = '"+customerid+"' and productid = '"+productid+"'",(err,res)=>{
       if(res.length==0)
       {
          sqlInsert = "INSERT INTO cart (customerid,productid,quantity) VALUES (?,?,?)"
          con.query(sqlInsert,[customerid,productid,quantity],(err,res)=>{
            if(err)
            console.log(err)
          })
       }
       else
       {
         sqlUpdate = "update cart set quantity = '"+quantity+"' where customerId = '"+customerid+"' and productId = '"+productid+"'"
         con.query(sqlUpdate,(err,res)=>{
           if(err)
           console.log(err)
         })
       }
     })
    
  }

  //  Delete Functions
   function cartDelete(customerid,productid){
    sqlDelete = "DELETE FROM Cart WHERE customerid = ? and productid = ?"
  }
  //Update  Functions
   function inventoryUpdate(customerid,productid,quantity){

  }
   function cartUpdate(customerid,productid,quantity){

  }
  //Geters
  async function getSellerByMail(mail){
    return await new Promise((resolve, reject) =>{
      sqlSearch = "SELECT * From Sellers Where mail = ?"
      con.query(sqlSearch,[mail],(err,result)=>{
        if(err)
        reject(err)
          console.log("Db",result)
        resolve({
            id:result[0].id,
            name:result[0].name,
            email:result[0].email,
            password:result[0].password,
            dob:result[0].dob,
            address:result[0].address,
            phone:result[0].phone,
            seller:"on"
        });

      })
    })
  }
   function getCustomerByMail(mail){

  }
   function getProductBySeller(sellerid){

  }
   function getProductByType(type){

  }
   function getSellerById(sellerid){
    sqlSearch = "SELECT * From Sellers Where sellerid = ?"
    var users = []
    con.query(sqlSearch,[sellerid],(err,result)=>{
      if(err)
      console.log(err)
      else
      users = result
    })
    return users
  }
   function getCustomerById(customerid){

  }
   function getCartById(customerid){

  }
   function getSalesById(customerid){

  }

  module.exports = { con,sellerInsert ,customerInsert ,productInsert ,sellerProductInsert  ,inventoryInsert ,cartInsert }