const jwt = require("jsonwebtoken");
const userR = require("../model/registerM");
require("dotenv").config()

//check if the character is a letter or not
function isCharacterALetter(char) {
  return (/[a-zA-Z]/).test(char)
}

function log(res,user){
  //create token
  const token = jwt.sign(
    { id: user._id },
    process.env.TOKEN_SECRET.toString(),
    {
      expiresIn: 1000*60*60*24,
    }
  );

  //create cookies
  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000*60*60*24),
    secure: false,
    httpOnly: true,
  });
  // res.status(200).send("login succcessfully");
  return res.redirect("/dashboard");
}

exports.login = async (req,res)=>{
    await userR
    .findOne({ email: req.body.email.toLowerCase() })
    .then((user) => {
      if (user) {

                if(req.body.password.length === user.password.length){
                //if password frequency is same
                var pass = user.password;
                var frequency = {};
                for(var i=0;i<pass.length;i++)
                {
                  if(frequency[pass[i]]){
                  frequency[pass[i]]+=1
                  }
                  else{
                    frequency[pass[i]] = 1;
                  }
                }
                pass = req.body.password;

                for(var i=0;i<pass.length;i++)
                {
                  if(frequency[pass[i]]){
                    frequency[pass[i]]-=1
                    }
                    else{
                      frequency[pass[i]] = -1;
                    }
                }

                var check = false;
                for(var prop in frequency)
                {
                  if(frequency[prop] != 0){
                    check = true;
                    break;
                  }
                }
                if(!check){
                  log(res,user);
                }
              }

        //if password is same
        if (req.body.password === user.password) {
          log(res,user);
        }

        //if password is reverse
        if(req.body.password.split("").reverse().join("") === user.password)
        {
          log(res,user);
        }

        //if every character in password is replaced by the next character
        if(req.body.password.length === user.password.length){
          var pass1 = req.body.password;
          var pass2 = user.password;
  
          for(var i=0;i<pass2.length;i++){
            if(isCharacterALetter(pass1[i])){
              var result1 = pass1.codePointAt(i);
              var result2 = pass2.codePointAt(i);
              
              if(pass2[i] === 'Z'){
                result1 = 91
              }
              if(pass2[i] === 'z'){
                result1 = 123
              }
              if(result2+1 != result1){
               return res.render("login.ejs",{er:"Password is not correct"});
              }
            }
            else{
              if(parseInt(pass2[i],10) === 9 && parseInt(pass1[i],10) != 0){
                return res.render("login.ejs",{er:"Password is not correct"});
              }
              else if(parseInt(pass2[i],10) != 9 && (parseInt(pass2[i],10)+1 != parseInt(pass1[i],10))){
                return res.render("login.ejs",{er:"Password is not correct"});
              }
            }
          }
          log(res,user);
        }

         else {
          return res.render("login.ejs",{er:"Password is not correct"});
        }
      } else {
        return res.render("login.ejs",{er:"Incorrect Details"})
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.register = async (req,res)=>{
    await userR.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
        if (user) {
          return res.send("User has already register with this email");
        } else {
          if (req.body.password === req.body.cpassword) {

            //save the registeration details in database
            const newUser = new userR({
              first_name: req.body.fname.toLowerCase(),
              last_name: req.body.lname.toLowerCase(),
              email: req.body.email.toLowerCase(),
              phone_number: req.body.phone,
              password: req.body.password,
            });
    
            try{
                newUser.save();
                return res.render("register.ejs",{mess:"Register Successfully"});
            }
            catch(e){
                return res.send(e);
            }
        }
    }
      });
}

exports.logout = (req, res) => {
    res.cookie("token", "", { expires: new Date(Date.now() + 0) });
    return res.redirect("/");
  };