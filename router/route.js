const router = require("express").Router();
const userController = require("../controller/userController")
const dashAuth = require("../middleware/dashAuth");
const userAuth = require("../middleware/userAuth");

router.get("/",userAuth.authAuthorization,async(req,res)=>{
    res.render("login.ejs",{er:undefined});
})
router.get("/register",userAuth.authAuthorization,(req,res)=>{
    res.render("register.ejs",{mess:undefined})
})
router.get("/dashboard",dashAuth.authAuthorization,async(req,res)=>{
    res.render("dashboard.ejs")
})
router.get("/logout",userController.logout);

//post request
router.post("/",userController.login)

router.post("/register",userController.register)


module.exports = router;