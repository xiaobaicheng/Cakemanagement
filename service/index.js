const express = require('express')
let app = express();
const cookieParser = require('cookie-parser');

app.listen(4002, () => {
    console.log('成功监听4002端口');
})
require('./middleware/mongoose')//配置数据库
app.use(require('./middleware/cors'))//cor跨域
app.use(cookieParser())//设置cookie

app.use(require('./middleware/session'))//设置seesion

app.use(express.json())//必选配置项，对json格式处理
app.use(express.urlencoded({ extended: true }))
app.use('/', require('./router/index'))//设置路由监听
app.use(express.static('./publice'))//配置静态路由