const ClientMessagingApp = require('./client_message_app')
const client = new ClientMessagingApp('localhost', '9001')

client.getMessages()
    .then(res => console.log(res))