const mysql = require('mysql')




  
var con = mysql.createConnection({
    host: "localhost",
    user: process.env.user,
    password: process.env.password,
    database:'mydb'
  });


 



module.exports=con



