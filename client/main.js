


document.addEventListener('DOMContentLoaded',()=>{
    setLoading("LOADING....")
    const url="http://127.0.0.1:5000/list"
        fetch(url).then(response=>response.json())
        .then(data=>{
            console.log(data)
            setLoading(" ")
            HTMLCONTENT(data)})
      
       
    })
    const socket=io.connect('http://127.0.0.1:5000/',{query:{user:"martins"}})
    const Status=document.querySelector('.status')

Status.innerHTML='* offline'
Status.classList.add('offline')
socket.on('online',(data)=>{

    Status.classList.add('online')
    Status.innerHTML='* online'
    
})






function setLoading(loading){
    const Ul = document.getElementById('ul')
    Ul.innerHTML=`${loading}`
}

function HTMLCONTENT(values){
    const ul =document.getElementById('ul')
  if(values.length<1){ul.innerHTML+=`EMTY`}
    else{values.map(value=>{ul.innerHTML+=`<li>name: ${value.name} ,address: ${value.address} -<button onclick=handleDel('${value._id}')>del</button>-<button onclick=handleUpdate('${value._id}','${value.name}','${value.address}')>update</button></li>`})}

  
}
let inputdata=''
let registerdata=''
let  registerdata3=""
let  registerdata4=""



const button =document.getElementById('button')
const button2 =document.getElementById('button2')

button.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(e.target)
   data={to:'martins',msg:inputdata}
socket.emit('new user',data)
input.value=''
inputdata=''
})

const handleDel=(e)=>{
console.log(e)
const url=`http://127.0.0.1:5000/delete?name=${e}`
fetch(url, {
    method: 'DELETE', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response=>
     { location.reload()
      response.json()}).then(data=>console.log(data))
}

const handleUpdate=(e)=>{
    console.log(e)
    const url=`http://127.0.0.1:5000/update?name=${e}`
    fetch(url, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response=>
         { location.reload()
          response.json()}).then(data=>console.log(data))
    }

button2.addEventListener('click',(e)=>{
    const url="http://127.0.0.1:5000/register"
    e.preventDefault()
    console.log(e.target)
  console.log(registerdata, registerdata3)
  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name:registerdata,address: registerdata3}),
  }).then(response=>
     { location.reload()
      response.json()}).then(data=>console.log(data))

input2.value=''
registerdata=''
registerdata3=''
input3.value=""
})

socket.on('hello',(data)=>{
    HTMLCONTENT(data)
})


const input =document.getElementById('inputtyping')
input.addEventListener('change',(e)=>{
  
inputdata=input.value
})

const input2 =document.getElementById('registertyping')
input2.addEventListener('change',(e)=>{
  
registerdata=input2.value
})

const input3 =document.getElementById('registertyping3')
input3.addEventListener('change',(e)=>{
  
registerdata3=input3.value
})