const http = require('http');
const Koa = require('koa');
const serve = require('koa-static');
const SocketIo = require('socket.io');
const app = new Koa();

const messages = [];

app.use(serve(__dirname + '/dist'));

const server = http.createServer(app.callback());
const io = new SocketIo(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', ({ message }) => {
        console.log('message', message);
        socket.emit('messages', { messages: [message] });
        socket.broadcast.emit('messages', { messages: [message] });
    });
});

server.listen(3000);
