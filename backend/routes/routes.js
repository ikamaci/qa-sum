const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkauth = require('../middleware/check_auth');
const multer = require("multer");
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const summarize = require('summarizely');
const textparse = require('text-parse');
const parser = textparse();
const MIME_TYPE_MAP = {
  "text/txt": "txt",
  "text/doc": "doc"

};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/files");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
router.post('/' ,checkauth, (req,res,next)=>{

  const post = new Post({
  type: req.body.type,
  content: req.body.content,
  creator: req.userData.userid
});
console.log("incoming post object")
console.log(post);

  //console.log(tokenizer.tokenize(post.content));
 // console.log(post.content)
  var paragraphs = post.content.split( /[\r\n|\n|\r]+/g );
 // const fln = parser.parse(post.content);

  var result = []
  for (let i in paragraphs) {
    result.push(paragraphs[i].match( /[^\.!\?]+[\.!\?(?="|')]+(\s|$)/g )) ;
  }

  res.status(201).json({
    message: "Post added successfully",
    postId: 12,
    words: result,
    paragraphs: paragraphs
  });
  /*
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
      words: tokenizer.tokenize(post.content)
    });
  }); */
});
router.get('/',checkauth,(req,res,next)=>{

  const pageSize = +req.query.pagesize;
  const currentpage = +req.query.page;
  const postquery = Post.find({creator: req.userData.userid});
  console.log(req.header.Userdata)
  if(pageSize && currentpage){
    postquery.skip(pageSize * (currentpage - 1))
      .limit(pageSize);

  }

  postquery.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.delete("/:id", checkauth , (req, res, next) => {
  Post.deleteOne({ _id: req.params.id , creator: req.userData.userid }).then(result => {
    console.log(result);
    if(result.n > 0) {
      res.status(200).json({ message: "Post deleted!" });
    }
    else {
      res.status(401).json({message: "Not Authorized"});
    }
  });
});
router.get('/db', (req, res, next) => {
  Post.find().then(results => {
    res.status(200).json(results);
  })
})

module.exports = router;
