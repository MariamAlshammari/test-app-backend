// 'use strict';
// module.exports=test;
// module.exports=getBookHandler;

// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/mytests", { useNewUrlParser: true , useUnifiedTopology: true });

// const booksSchema=new mongoose.Schema({
//   email:String,
//   name:String,
//   description:String,
//   status:String
// });

// const ownerSchema= new mongoose.Schema({
//   email:String,
//   books:[booksSchema]
// });

// const myBookModel=mongoose.model('book',booksSchema);
// const ownerModel=mongoose.model('owner',ownerSchema);

// function seedBookCollection(){
//   // const book1=new myBookModel({
//   //   name:'bb1',
//   //   title:'horrorbook'

//   // })
//   // console.log(book1);
//   // book1.save();

//   const mariam=new ownerModel({
//     email:'malshammari37@gmail.com',
//     books:[{
//       name:'mariam',
//       description:'booksdlhh',
//       status:'horror'
//     },
//     {
//       name:'mariam1',
//       description:'roofdgdfh',
//       status:'hofrgerror'
//     }]
//   })
//   console.log(mariam);
//   mariam.save
// }
// seedBookCollection();


// function test(req,res){
// res.send('all good');

// }
