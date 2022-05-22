
var mysql = require('mysql');
  var db_config = {
    host: "bari6b71rrwpyfiae707-mysql.services.clever-cloud.com",
    user: "uvxbu2dzgz9l85ar",
    password: "c2UeNnyyh9aj5OBiLY05"
  };
  
  var con;
  con = mysql.createConnection(db_config);

  con.query("use bari6b71rrwpyfiae707")
  con.query("SET autocommit = 0");
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
   function salesInsert(customerid,productid,quantity,date){
    sqlInsert = "INSERT INTO Orders (customerid,productid,quantity,ordertime) VALUES (?,?,?,?)"
    con.query(sqlInsert,[customerid,productid,quantity,date],(err,res)=>{
      if(err)
      console.log(err)
      else
      console.log("success product",res)
    })
    con.query("COMMIT",async (err,result)=>{});
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


  module.exports = { con,sellerInsert ,customerInsert ,productInsert ,sellerProductInsert  ,inventoryInsert ,cartInsert ,salesInsert }