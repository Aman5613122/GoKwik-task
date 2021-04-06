const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookie = require("cookie-parser");
const PORT = 5000;

require("./server/mongoose");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookie());

const Route = require("./router/route");

app.use("/",Route);

app.listen(PORT,()=>{
    console.log("Server is running on port 5000");
})