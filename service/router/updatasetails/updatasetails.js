const express = require('express')
let router = express.Router();
const detaileDB = require('../../database/details')
const multer = require("multer");
const path = require("path");
const { IncomingForm } = require('formidable')

//新增数据
router.post('/', (req, res) => {
    let a = null
    const { name, message, price } = req.body
    // 配置multer处理图片文件
    let upload = multer({
        storage: multer.diskStorage({
            //设置文件存储在服务端那个文件目录下
            destination(req, file, callback) {
                callback(null, path.join(__dirname, "../../publice/image"))
            },
            //设置文件名，注意防止重名
            filename(req, file, callback) {
                // 名称.后缀名   file.originalname
                //解构 file.originalname中的ext  这是传过来的文件后缀名
                let { ext } = path.parse(file.originalname);
                a = new Date().getTime() + ext;
                callback(null, a)
            }
        })
    }).single("file");//处理文件名为file控件上传的图片文件 name名要匹配
    upload(req, res, (err) => {
        const { name, message, price } = req.body
        if (err) {
            res.send({
                code: 500,
                message: "添加数据失败"
            });
        } else {
            //文件已经存储成功到指定的文件目录下
            let imgurl = `/image/${a}`
            //创建新数据数据库里面的路径
            detaileDB.create({
                name: name, message: message, price: price, imgurl: imgurl
            })

            // //响应前端
            res.send({
                code: 200,
                message: "新增数据成功",
            });
        }
    })
})
//删除数据
router.delete('/detele', async (req, res) => {
    let { _id } = req.body
    await detaileDB.findByIdAndDelete(_id);
    res.send({ code: 200, message: "删除成功" })
})
//修改数据
router.post('/updata', async (req, res) => {
    let a = null
    const { _id, name, message, price } = req.body
    // 配置multer处理图片文件
    let upload = multer({
        storage: multer.diskStorage({
            //设置文件存储在服务端那个文件目录下
            destination(req, file, callback) {
                callback(null, path.join(__dirname, "../../publice/image"))
            },
            //设置文件名，注意防止重名
            filename(req, file, callback) {
                // 名称.后缀名   file.originalname
                //解构 file.originalname中的ext  这是传过来的文件后缀名
                let { ext } = path.parse(file.originalname);
                a = new Date().getTime() + ext;
                callback(null, a)
            }
        })
    }).single("file");//处理文件名为file控件上传的图片文件 name名要匹配
    upload(req, res, async (err) => {
        const { _id, name, message, price } = req.body
        if (err) {
            res.send({
                code: 500,
                message: "修改数据失败"
            });
        } else {
            //文件已经存储成功到指定的文件目录下
            if (a){
                let imgurl = `/image/${a}`
                await detaileDB.findByIdAndUpdate(_id, {
                    name: name, message: message, price: price, imgurl: imgurl
                });
            }
            //修改数据库里面的路径
       
            // //响应前端
            res.send({
                code: 200,
                message: "修改数据成功",
            });
        }
    })
})
module.exports = router