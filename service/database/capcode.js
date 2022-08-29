const mongoose = require('mongoose')
const Schema = mongoose.Schema;//路由表规则
const codeSchema = new Schema({
    capcode:{
        type:String,
        required:true
    },
})
module.exports = mongoose.model('capcode',codeSchema)