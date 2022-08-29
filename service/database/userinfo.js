const mongoose = require('mongoose')
const Schema = mongoose.Schema;//路由表规则
const userSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phtoto:{
        type:String,
        default:'/image/1.jpg'
    }
})
module.exports = mongoose.model('userinfo',userSchema)