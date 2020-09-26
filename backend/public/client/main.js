document.addEventListener('DOMContentLoaded',()=>{
const url=`http://127.0.0.1:5000/list`
    fetch(url).then(data=>console.log(data))
  
   
})
const socket=io()
const Status=document.querySelector('.status')

Status.innerHTML='* offline'
Status.classList.add('offline')
socket.on('online',(data)=>{

    Status.classList.add('online')
    Status.innerHTML='* online'
    
})








function HTMLCONTENT(values){
    const ul =document.getElementById('ul')

    ul.innerHTML+=`<li>${values}</li>`
}
let inputdata=''
const button =document.getElementById('button')
button.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(e)
   data={to:'martins',msg:inputdata}
socket.emit('new user',data)
input.value=''
inputdata=''
})

socket.on('hello',(data)=>{
    HTMLCONTENT(data)
})


const input =document.getElementById('inputtyping')
input.addEventListener('change',(e)=>{
  
inputdata=input.value
})