const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')


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

require('./models/user')
require('./models/images')
app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/profile'))

app.listen(PORT, ()=>{
    console.log("server is listening on ", PORT)
})