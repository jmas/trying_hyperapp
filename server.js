const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const ws = require('nodejs-websocket');

const messages = [];

const server = ws.createServer(conn => {
    console.log('Connection: new');
    setTimeout(() => {
        conn.sendText(JSON.stringify(messages));
    }, 1000);
    conn.on('text', text => {
        const message = {
            ...JSON.parse(text),
            time: new Date(),
        };
        messages.push(message);
        console.log('Connection: text', message);
        server.connections.forEach(conn => {
            conn.sendText(JSON.stringify([message]));
        });
    });
    conn.on('close', (code, reason) => {
        console.log('Connection: closed');
    });
    conn.on('error', error => {
        console.log('Connection: error');
    });
}).listen(3001)

app.use(serve(__dirname + '/dist'));

app.listen(3000);
