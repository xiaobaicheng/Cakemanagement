const mongoose = require('mongoose')
const Schema = mongoose.Schema;//路由表规则
const detaileSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imgurl:{
        type:String,
        
    }
})
module.exports = mongoose.model('details',detaileSchema)