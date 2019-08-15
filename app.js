//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');

const homeStartingContent="Sorting is one of the most basic functions applied to data. It means arranging the data in a particular fashion, which can be increasing or decreasing. There is a builtin function in C++ STL by the name of sort().Internally this function is implemented as Quick-sort. The complexity of it is O(N*log(N)).";
const aboutContent="I am Manas sinha from Bihar, India. ";
const contactContent="instagram handle : @_manas_sinha_";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res){
  res.render("home",{heading : "Sorting C++",content : homeStartingContent,blogs:posts});
});

app.get("/about",function(req,res){
  res.render("about",{heading : "About",content : aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{heading : "Contact",content : contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose",{heading : "Compose"});
});

app.post("/compose",function(req,res){
  let modifiedTitle=_.capitalize(req.body.title);
  const newBlog={
    title : modifiedTitle,
    content : req.body.content,
  };
  posts.push(newBlog);
  res.redirect("/");
});

app.get("/posts/:title",function(req,res){
 

  posts.forEach(function(value){
    let reqTitle=_.startCase(req.params.title);
    let title=_.startCase(value.title);
    if(reqTitle===title){
      res.render("post",
      {heading : value.title,
       content : value.content
      
      });
      
      
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
