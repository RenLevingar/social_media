const mongoose = require('mongoose');

const personScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Must provide a name'],
        trim: true,
        maxLength:[20, "The name can't exceed 20 characters"]
    },
    email:{
        type: String,
        required:[true],
        trim: true,
        maxLength:[30]
    },
    age:{
        type: String,
        trim: true,
        default: 5
    },
    password:{
        type: String,
        required: [true],
        trim: true,
    }
},{collection:'People'})

module.exports = mongoose.model('People', personScheme)