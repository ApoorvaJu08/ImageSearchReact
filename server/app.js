const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')

require('./models/user')
app.use(express.json())

app.use(require('./routes/auth'))
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("connected to mongo")
})
mongoose.connection.on('error', () => {
    console.log("error in connection")
})

app.listen(PORT, ()=>{
    console.log("server is listening on ", PORT)
})