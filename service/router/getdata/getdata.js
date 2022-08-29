const express = require('express')
let router = express.Router();
const shoppingcatDB = require('../../database/shoppingcat');//购物车表
const detaileDB = require('../../database/details')
//获取首页详情数据
router.get('/details', async(req,res)=>{
  const setilesdoc =await detaileDB.find()  
  res.send({
    code:200,
    msg:'商品信息获取成功',
    data:setilesdoc
  })
})
//获取购物车数据
router.get('/shop',async (req,res)=>{
  const shopDoc = await shoppingcatDB.find();
  res.send({
    code:200,
    msg:'购物车获取成功',
    data:shopDoc,
  })
})
module.exports = router