const express = require('express')
let router = express.Router();
const userDB = require('../../database/userinfo')//用户表格
router.post('/', async (req, res) => {
    let { user, password } = req.body
    if (user.length < 4 || password.length < 8) {
        return res.send({
            code: 500,
            msg: '账号或密码格式不正确'
        })
    }
    let userDoc = await userDB.findOne({ user });
    //如果用户已经存在
    if (userDoc) {
        res.send({
            code: 500,
            msg: '用户已存在'
        })
    } else {
        //如果用户不存在
        await userDB.create({ user, password }),
            res.send({
                code: 200,
                msg: '用户注册成功'
            })
    }
})
module.exports = router