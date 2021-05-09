const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
import Database from "../../database";

const db = new Database();
let connections = {}

io.on('connection', async function(socket)
{
    let user = socket.request._query['user'];
    if (user = (await db.query(`SELECT * FROM User WHERE tmp = '${user}'`))[0])
    {
        connections[user.id] = socket
    }
    socket.on('chat', async function(data){
        data.id = (await db.query(`SELECT * FROM User WHERE tmp = '${data.id}'`))[0].id
        let sender = data.id;
        let receiver = data.other;
        let tab1 = (await db.query(`SELECT * FROM Matching WHERE id_user2 = '${sender}' AND id_user1 = '${receiver}'`))
        let tab2 = (await db.query(`SELECT * FROM Matching WHERE id_user1 = '${sender}' AND id_user2 = '${receiver}'`))
         if (connections[sender] && (tab1.length + tab2.length != 0))
        {
            connections[sender].emit('newMessage', data);
        }
        if(connections[receiver] && (tab1.length + tab2.length != 0)){
            connections[receiver].emit('newMessage', data);
        }
    })
    socket.on('notification', function(data){
        let receiver = data.id
        if(connections[receiver])
        {
            connections[receiver].emit('notification', data);
        }
    })
});

module.exports = {
    app,
    server
}