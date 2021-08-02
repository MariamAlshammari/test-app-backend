'use strict';

// require('dotenv').config();
// const express='express';
// const cors = 'cors';
// const server=express();
// server.use(cors());
// const PORT=process.env.PORT;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');
const app = express();
app.use(cors());

app.use(express.json())

const PORT = process.env.PORT || 3001;

// const test=require('./moduls/tesst.js');

// app.get('/',test);
// const getBookHandler=require('./moduls/tesst.js');

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mytest", { useNewUrlParser: true , useUnifiedTopology: true });

const booksSchema=new mongoose.Schema({
  email:String,
  name:String,
  description:String,
  status:String
});

const ownerSchema= new mongoose.Schema({
  email:String,
  books:[booksSchema]
});

const myBookModel=mongoose.model('book',booksSchema);
const ownerModel=mongoose.model('owner',ownerSchema);

function seedBookCollection(){
 

  const mariam=new ownerModel({
    email:'malshammari37@gmail.com',
    books:[{
      name:'mariam',
      description:'booksdlhh',
      status:'horror'
    },
    {
      name:'mariam1',
      description:'roofdgdfh',
      status:'hofrgerror'
    }]
  })
  console.log(mariam);
  mariam.save();
}
seedBookCollection();





app.get('/', (request, response) => {

  response.send('all good')

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})
app.get('/book',getBookHandler);


//localhost:3001/book?userEmail=malshammari37@gmail.com
function getBookHandler(req,res){
  // res.send('hi aga in');
  let userEmail=req.query.userEmail;
  ownerModel.find(
    {email:userEmail},function(error,ownerData){
    // console.log(userEmail);
    // console.log(ownerData[0].books);
      if (error){
          res.send('wrong')
      }
      else{
          res.send(ownerData[0].books);
      }
  })
  }
//http://localhost:3001/addbooks?name=b1&description=d1&status=s1&userEmail=malshammari37@gmail.com
  app.post('/addbooks',addBookHandler);

  function addBookHandler(req,res){
    // let userEmail=req.query.userEmail;
    let {name,description,status,userEmail}=req.body;
    console.log('llll',userEmail);
    ownerModel.find({email:userEmail},(error,ownerData)=>{
    if(error)
    {res.send('wroong')}
    else{
      console.log(ownerData[0]);
      ownerData[0].books.push({
        name:name,
        description:description,
        status:status
      })
      console.log(ownerData[0]);
      ownerData[0].save();
      res.send(ownerData[0].books)
    }})

  }

  app.put('/updateBooks/:bookId',updateBookHandler)

  function updateBookHandler(req,res){
    let {name,description,status,userEmail}=req.body;
    let bookId=Number(req.params.bookId)

    ownerModel.findOne({email:userEmail},(error,ownerData)=>{
      if(error){
        res.send('errrr')
      
      }else
      {
        ownerData.books.splice(bookId,1,{
          name: name,
                status: status,
                description: description
        })
        console.log(ownerData);
        ownerData.save();
        res.send(ownerData.books)
      }
    })
  }
// localhost:3001/deleteBooks/1?userEmail=malshammari37@gmail.com
  app.delete('/deleteBooks/:bookId',deleteBookHandler)

  function deleteBookHandler(req,res){
    let bookId=Number(req.params.bookId)
    let userEmail=req.query.userEmail

    ownerModel.find({email:userEmail},(error,ownerData)=>{
      if(error){
        res.send('wrongg')
      }else{
        let newBooks=ownerData[0].books.filter((item,idx)=>
        {
          if(idx!==bookId)
          return item
        })
        ownerData[0].books=newBooks
        ownerData[0].save()
        res.send(ownerData[0].books)
      }
    })
  }


app.listen(PORT, () => console.log(`listening on ${PORT}`));
