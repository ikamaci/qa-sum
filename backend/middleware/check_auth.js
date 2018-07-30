const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
console.log("check auth")
  try {
    let s = req.headers.authorization;
    console.log(s);
    const token_ = s.split(' ');
    const token = token_[1];
    const decoded =  jwt.verify(token, 'secret_should_be_longer');
    req.userData = {email: decoded.email, userid: decoded.userId};
    next();
  }
  catch(error){
    res.status(401).json({message: 'Auth failed', bilgi: s})
  }

}
