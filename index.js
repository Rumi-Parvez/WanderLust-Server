import cors from "cors"
import express from "express"
import 'dotenv/config'
import { MongoClient } from 'mongodb';

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const client = new MongoClient(process.env.MONGODB_CONNECTION);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongodb = await connectToMongoDB() 
const db = mongodb.db('WanderLust_DB')
const user = db.collection('user')
const destination = db.collection('destinations')



app.get('/place', async(req,res)=>{
    const data = destination.find({})
    const result = await data.toArray();
    res.send(result) 

})
app.post('/place', async(req, res)=>{
    const data = req.body;
    console.log(data);

    const result = await destination.insertOne(data)
    res.send(result)
})



app.get('/', (req , res)=>{
    res.send({message: "hello world server"})
})

app.listen(PORT, ()=>{
    console.dir(`The server is sucsessfully running on the Port of ${PORT}`)
})