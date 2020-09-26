const con = require('../mysqldb')
const express= require('express')

const router = express.Router();

//crude operation on mysql database using node js


//get all items from mysql database
router.get('/list',(req,res)=>{
    const qry =`SELECT * FROM CUSTOMERS`
    con.query(qry,(err,success)=>{
        if (err) return res.status(401).send({err:err});
        res.status(200).send(success)
    })
    
})

//delete from mysql database
router.delete('/delete',async (req,res)=>{
    const{query:{name}}=req
   const query=`DELETE FROM CUSTOMERS WHERE _id =?`

await con.query(query,[name],(err,success)=>{
    if(err) throw err;
    res.status(200).send(success)
})
})
//register to database
router.post('/register', async (req,res)=>{
   
    
    const{body:{name,address}}=req
   if(name.length<2|| address.length<2){
       return res.status(502).send({error:"fill all values"})
   };
    console.log(name,address)
    // const qry =`SELECT * FROM CUSTOMERS`
    qry = `INSERT INTO CUSTOMERS (name, address)
VALUES ('${name}', '${address}');`
//qry=`INSERT INTO customers (name, address) VALUES ('${name}', '${address}');`
await con.query(qry,(err,success)=>{
    if(err) res.status(501).send({err:err});
    else{res.status(200).send({success:"saved successfully"})}
})
})












module.exports= router