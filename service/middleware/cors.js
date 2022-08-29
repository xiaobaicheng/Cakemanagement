const cors=require("cors");
module.exports=cors({
    origin:"*",//允许所有端口访问
    credentials:true,
})  