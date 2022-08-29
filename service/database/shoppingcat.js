const mongoose = require('mongoose')
const Schema = mongoose.Schema;//路由表规则
const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },//名字
    message: {
        type: String,
        required: true
    }, //描述
    price: {
        type: Number,
        required: true
    },//价格
    shopimg: {
        type: String,
    },//商品图片
    count: {
        type: Number,
        required: true,
        default:1
    },//数量
})
module.exports = mongoose.model('shoppingcat', shopSchema)