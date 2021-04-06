const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/Giki"

mongoose.connect(url,{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
},(err,db)=>{
    if(err){console.log(err); return err}
    else{console.log("db is connected")}
});