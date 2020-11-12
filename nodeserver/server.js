
const io = require('socket.io')(8000);
const users = {};

// const http = require('http');


// // app.use('/index.html' , express.static('JS'));
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.status(200).send('index.html');
  
// });

// server.listen(port => {
//   console.log(`Server running at :${port}`);
// });
// app.get('/index.html' , (req,res)=>{
     
     
//     res.status(200).send('index.html');

// });
// require('browserify') (8000)

io.on('connection', socket =>{
    socket.on('new-user-joined',name=>{
        // console.log('New user', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
socket.emit('users',name)
    });
    
    socket.on('sen', message => {
        socket.broadcast.emit('receive',{  message : message, name  :  users[socket.id]})
    });
 
    
    socket.on('disconnect', n => {
        socket.broadcast.emit('left', users[socket.id]);
     
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('t',{ name : users[socket.id]})
        

    });
    socket.on('type',function(dat){
        socket.broadcast.emit('type',{})
        

    });
})

console.log("hello dunia walo welcome to the tour");
