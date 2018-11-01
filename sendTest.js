const ClientMessagingApp = require('./client_message_app')
const client = new ClientMessagingApp('localhost', '9001')

client.sendMessage('cabify', 'prueba')
    .then(res => console.log(res))