var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
require ('dotenv').config();
var uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

client.connect((err, client)=>{
  if(err){
    console.log("Error conectandose a mongo");
  }
  console.log("Connected to mongo Atlas.");
})

router.post("/newname", (req,res)=>{
  let db = client.db("gregodb");
  let misc = db.collection("misc");

  let op = {
    name: "Gregorio"
  };

  misc.insertOne(op, (res, err)=>{
    if(err) throw err;

    console.log("Item agregado con exito");
  });

})

router.get("/names", function(req, res){
  let db = client.db("gregodb");
  let misc = db.collection("misc");

  misc.find({}).toArray((err,data)=>{
    if(err) throw err;

    res.json(data);
  })

})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
