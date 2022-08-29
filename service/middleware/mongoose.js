const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/Cake", {
    //连接数据库时的基本配置项
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功");
}).catch((err) => {
    console.log("数据库连接失败", err);
})
// const detaileDB = require('../database/details')

// detaileDB.create(
//     {name: "雪域芝士奶油", message: '经典之做 热销多年', price: 218, imgurl: "/image/list_10800.jpg"},
//     {name: "女王的花园", message: '啡凡活力下午茶组合元气甜宠下午茶组合', price: 298, imgurl: "/image/list_26397.jpg"},
//     {name: "环游世界", message: '五星好评 9种口味一次过瘾', price: 258, imgurl: "/image/list_12287.jpg"},
//     {name: "野趣宝藏", message: '高颜值野餐甜品盒，多款口味，一次打卡', price: 338, imgurl: "/image/list_27084.jpg"},
//     {name: "云朵芒芒", message: '当季大块芒果蛋糕，香甜而多多汁', price: 268, imgurl: "/image/list_27081.jpg"},
//     {name: "杨枝甘露卷", message: '宝藏夏日星品，丝滑软心，冰凉过瘾', price: 218, imgurl: "/image/list_26628.jpg"},
//     {name: "提拉米苏.心意", message: '80%的雪域老友也喜欢这一款', price: 218, imgurl: "/image/list_26553.jpg"},
//     )