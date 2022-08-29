const express = require('express')
let router = express.Router();
const userDB = require('../../database/userinfo')//用户表格、
const capcodeDB = require('../../database/capcode')//验证码
const svgCaptcha = require('svg-captcha');
const session = require("express-session");
// router.all("*",(req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers","X-Requested-With");
//     res.header("Access-Control-Allow-Headers","Content-Type");
//     if(req.method=="OPTIONS")  res.send(200); /*让option请求快速返回*/
//     else next();
//   });

router.post('/', async (req, res) => {
    let codeDoc = capcodeDB.findOne();
    let { user, password, } = req.body
    if (user.length < 4 || password.length < 8) {
        return res.send({
            code: 500,
            msg: '账号或密码格式不正确'
        })
    } else {
        let userDoc = await userDB.findOne({ user })
        if (!userDoc) {
            res.send({
                code: 500,
                msg: '用户不存在，请先注册'
            })
            return;
        }
        if (userDoc.password === password) {
            res.send({
                code: 200,
                msg: '用户登陆成功',
            })
        } else {
            res.send({
                code: 500,
                msg: "密码错误"
            })
        }
    }
})
router.get("/getCode", (req, res) => {
    const code = svgCaptcha.create({
        size: 4, // 随机生成验证码长度
        ignoreChars: "0o1iIl",
        noise: 3,  // 设置干扰线的数量
        color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
        background: "#fff", // 背景颜色
        fontSize: 60, // 设置字体大小
        width: 150, //宽度
        height: 50, //高度
    })
    // req.session.capdata = code.text.toLowerCase(); // session 存储验证码数值
    let codeDoc = capcodeDB.find();
    if (codeDoc){
        // capcodeDB.f();
                capcodeDB.create({
           capcode:code.text.toLowerCase()
        })
    }else{
        capcodeDB.create({
            capcode:code.text.toLowerCase()
         })
    }
    // capcodeDB
    //数据存在cookie中
    // res.cookie("captcha", req.session.captcha,{maxAge:30000, httpOnly:false,} );
    res.type('svg'); // 响应的类型
    res.send(code.data)
})

module.exports = router