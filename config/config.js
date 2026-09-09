const mongoose=require("mongoose");
const MONGO_url=process.env.MONGO_url || null ;
databaseConnect=()=>{mongoose.connect(MONGO_url)
.then((conn)=>
    { console.log("database connected successfully");})
.catch((e)=>
    { console.log(e);});
};
module.exports=databaseConnect;
