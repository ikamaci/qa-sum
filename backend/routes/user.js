const express = require('express');
const router = express.Router();
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../models/user');

router.post('/signup', (req,res,next) => {
  console.log("post başarıyla geldi")
  console.log(req.body);
  bcyrpt.hash(req.body.password , 10 )
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User Saved",
            result: result
          })
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })

});
router.get('/signup', (req,res,next) => {
  res.send("Başarılı");
} )
router.get('/db', (req, res, next) => {
  User.find().then(results => {
    res.status(200).json(results);
  })
})




router.post('/login' , (req,res,next) => {
  console.log(req.body);
 let fetcheduser;
  User.findOne({email: req.body.email})
    .then(user => {
      fetcheduser = user;
    if(!user){
      return res.status(500).json({message: "Auth error"})
    }
    return bcyrpt.compare(req.body.password , user.password);
  })
    .then(result => {

      if(!result){
        console.log("Parola yanlış");
        return res.status(500).json({message: "Auth error"})
      }
      const token = jwt.sign({email: fetcheduser.email , userId: fetcheduser._id }, 'secret_should_be_longer',{expiresIn: "1h"});
      res.status(200).json({
        token: token,
        expiresIn: 3600
      })
    })
} )
module.exports = router;
