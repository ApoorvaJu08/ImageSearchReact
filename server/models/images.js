const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    addedBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Images", imageSchema)