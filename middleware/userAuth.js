const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authAuthorization = async (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      next();
      return;
    }
    const decrypt = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decrypt

    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};
