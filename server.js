
const io = require('socket.io')(8000)
const port = process.env.PORT || 8000;

const http = require('http');

const hostname = '127.0.0.1';


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// require('browserify') (8000)
const users = {};
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
