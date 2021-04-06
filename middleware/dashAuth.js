const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authAuthorization = async (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.send("please login")
    }
    const decrypt = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decrypt

    next();
  } catch (err) {
    console.log(err);
  }
};
