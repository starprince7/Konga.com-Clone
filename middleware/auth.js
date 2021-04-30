const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({ auth: false });
  } else {
    const verifyToken = jwt.verify(token, "mysecret", (err, dToken) => {
      if (err) {
        return res.json({ auth: false });
      } else {
        // res.json({ auth: true });
        next();
      }
    });
  }
};

module.exports = requireAuth
