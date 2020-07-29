const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')


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

if(process.env.NODE_Env == "production"){
    app.use(express.static('image-search/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'image-search', 'build', 'index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log("server is listening on ", PORT)
})