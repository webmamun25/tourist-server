const express = require('express')
const app = express()
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT||7000
var cors = require('cors')
const { MongoClient } = require('mongodb');
require("dotenv").config();
var bodyParser = require('body-parser')
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eorxc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

console.log(uri)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function run() {
    try {
      await client.connect();
      const database = client.db("VacationDB");
      // Specifying a Schema is optional, but it enables type hints on
      // finds and inserts
      const PlaceCollection = database.collection("Places");
      const OrderCollection = database.collection("Orders");
      
        app.get('/places', async(req, res)=> {
            
            const result = await PlaceCollection.find({}).toArray();
            res.send(result);
        })
      app.post('/placeorder', async (req, res) => {
        const result = await OrderCollection.insertOne(req.body)
        res.send(result);

          
        }
      )

      app.get('/myorders/:useremail', async (req, res) => {
        const result = await OrderCollection.find({ useremail: req.params.useremail }).toArray()
        res.send(result);
   
   
      })

      app.delete("/deleteplace/:id", async(req, res) => {
        console.log(req)
        const query =  {_id:ObjectId(req.params.id)}
        let result = await OrderCollection.deleteOne(query);

       
       
        res.send(result)
      })
        
        
        
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })