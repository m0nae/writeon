const jwt = require("jsonwebtoken");

exports.authGraphql = function authGraphql(req, res, next) {
  try {
    let token = req.cookies.jwt;
    if (!token) {
      throw new Error("No user is logged in.");
    } else {
      let payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
      let { username, _id } = payload;
      req.user = { username, _id };
      next();
    }
  } catch (err) {
    throw err;
  }
};
