const socket = io('http://localhost:8000');
const form = document.getElementById('sendcontainer');
const messageinput = document.getElementById('messageimp');
const messagecontainer = document.querySelector('.container')
const sendcontainer = document.getElementById('sendcontainer')
const feedback = document.getElementById('feedback')
const messageim = document.getElementById('messageimp')
const btn = document.querySelector('.btn')
const inform = document.getElementById('inform');
const messageinpu = document.getElementById('messageimp');
const div = document.createElement('div');
const audio = new Audio('whatsapp.mp3');


// This is append function
const append = (message,position)=>{
    
// because of this we can see the element of message in different types like h1,p
const messageElement = document.createElement('h6')

// const informElement = document.createElement('h1')
// the above one dont make any change

// Because of this we can see the messages
messageElement.innerText = message;

// messageElement.innerText  = style;
// this helps to add the messages of the user
messageElement.classList.add('message');

// this helps to fix the position of the elements
messageElement.classList.add(position);

// this is the most imp because of this we can see the messages in .container
messagecontainer.append(messageElement);


if(position=='left'){

    audio.play();
}
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
     const message = messageinput.value;
    
      append(` You: ${message} `, 'right')
// the below is havig link of main function in index.js

// you should not broadcast this messages
     socket.emit('sen', message);

     feedback.innerHTML = '';
     messageinput.value = '';
    
  
})
const name = prompt('Enter Your name to join');
socket.emit('new-user-joined', name)

socket.on('receive', message =>{
    append(`${message.name} : ${message.message}`, 'left');
    feedback.innerHTML = '';
    })
  
// messageim.addEventListener('keypress',function(){
    // setInterval('typing',3000) ;
    // socket.emit('typing',sendcontainer.value);
    
// })
// const PORT = process.env.PORT || 8000;
// append.listen(PORT,()=>{
    // console.log(`App is running on port ${PORT}`);
// });
// This is imp it helps to stop the message
messageim.addEventListener('keyup',function(){
    socket.emit('type',sendcontainer.value)
    
})

// by writing name server will accept and give the message to everyone
socket.on('user-joined', name=>{
append(`${name} joined the chat`, 'right');
})




    
socket.on('users',name=>{
    inform.innerHTML = `  <h1>${name} Welcome To the I-chat </h1> `
    
})
    socket.on('left', name=>{
        append(`${name} left the chat`, 'right');
        feedback.innerHTML = '';
        })
    
    socket.on('t', d=>{
        
        feedback.innerHTML = ` <h3> ${d.name} is typing a message... </h3>`
        // for this youvis have to do it like a form [dont do this]
        // append(`${name} is typing a message`,'left')
    })
    socket.on('type', function(){
    
        feedback.innerHTML = ``
     
    })