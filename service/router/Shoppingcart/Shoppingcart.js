const express = require('express')
let router = express.Router();
const shoppingcatDB = require('../../database/shoppingcat');//购物车表
const detaileDB = require('../../database/details');//总数据表单
const { count, findById } = require('../../database/shoppingcat');


//购物车新增加数据
router.post('/add',async (req,res)=>{
let {_id } = req.body;
let detaileDoc =await detaileDB.findById(_id);
let shopDoc =await shoppingcatDB.findById(_id);
// 当购物车数据库中已经有当前需要加入数据的商品时
if (shopDoc){
    await shoppingcatDB.findByIdAndUpdate(_id, {
        count:shopDoc.count+=1
    });
    res.send({
        code:200,
        meg:'商品添加成功'
    })
}else{
    // 如果商品信息存在
    if(detaileDoc){
        shoppingcatDB.create({
            _id:detaileDoc._id,
            name:detaileDoc.name,
            message:detaileDoc.message,
            price:detaileDoc.price,
            shopimg:detaileDoc.imgurl
        })
        res.send({
            code:200,
            msg:'已加入购物车'
        })
    }else{
        return;
    }
}

})
// 在购物车页面时控制数量加减
router.post('/updataCount',async (req,res)=>{
    let {_id,isAddition} = req.body;
    let shopDoc =await shoppingcatDB.findById(_id);
    // 如果购物车里有此种商品
    if  (shopDoc){
        // 如果传过来的是-1那么就是减少商品数量
        if (isAddition == '-1' && shopDoc.count > 1){
            await shoppingcatDB.findByIdAndUpdate(_id,{
                count:shopDoc.count-=1
            })
            // 如果传过来的是1那么数量加一
        }else if (isAddition == "1"){
            await shoppingcatDB.findByIdAndUpdate(_id,{
                count:shopDoc.count+=1
            })
        }
       res.send({
        code:200,
        msg:'加减商品成功'
       })
    }else{
        res.send({
            code:400,
            msg:'当前商品不存在'
        })
        return;
    }
})
// 删除购物车商品
router.delete('/deteleshop', async (req, res) => {
    let { _id } = req.body
    await shoppingcatDB.findByIdAndDelete(_id);
    res.send({ code: 200, message: "移出购物车成功" })
})
module.exports = router
