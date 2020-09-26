const express= require('express')
const app= express();
const corse= require('cors')
const mysql= require('mysql')
require('dotenv').config()
const homeRoute= require('./routes/routes.js')
const socket = require('socket.io')
const path= require('path')

const con= require('./mysqldb')

const activeusers=new Set()

const time=  Date()


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  


port= process.env.PORT



app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(corse())
app.use(express.static(__dirname+'/public/client'))





app.use(homeRoute)
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname+'/public/client/index.html'))
})


const server=app.listen(port,(err,success)=>{
    if(err) console.log(err);
console.log(`server running on port ${port}`)



})
const users=[]

const io = socket(server)

// io.use((sock,next)=>{
//     var handshakeData = sock.request;
//     console.log('query:',handshakeData._query.user);
//     console.log('extra:',handshakeData._extra);
//     next()
// })
io.on('connection',async (socket) => {
    console.log(socket.handshake.query.user,' is online now')
    const userId =socket.handshake.query.user
    socket.join(userId);
    // users.push(userId)
    io.to(userId).emit('online','online')
    console.log('connecteed to socket',users)



    // io.on('connection', function(socket){
    //     socket.on('say to someone', function(id, msg){
    //         socket.broadcast.to(id).emit('my message', msg);
    //     });
    // }); // send message only between two users, with the user id known
  
   
 

    
    socket.on('newMessage',(data)=>{
        const {to,msg,from}=data
        console.log(to)
        console.log(from)
        console.log(msg)
        console.log(data)
        console.log(users)
        console.log('message to ',to)
        io.to(to).emit('hello' ,data.msg);// send message to a single user of known id from the uniq sets created
        io.to(from).emit('newMessage',data)
        // io.to(users[1]).emit('hello' ,data.msg);// send message to a single user of known id from the  uniq sets created
    //  io.emit('hello',data)  //--> emites message to all connected users
    
         })
    
   


    
})


