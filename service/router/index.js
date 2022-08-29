const express = require('express')
let router = express.Router();


router.use('/register',require('./Login/register'))//监听注册路由
router.use('/login',require('./Login/login'))//监听登陆路由
router.use('/getdata',require('./getdata/getdata'))//监听获取数据路由
router.use('/updatasetails',require('./updatasetails/updatasetails'))//监听主要展示页面的数据的接口
router.use('/Shoppingcart',require('./Shoppingcart/Shoppingcart'))//监听购物车路由



module.exports = router