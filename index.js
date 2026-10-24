import cors from "cors"
import express from "express"
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())





app.get('/', (req , res)=>{
    res.send({message: "hello world server"})
})

app.listen(PORT, ()=>{
    console.log(`The server is sucsessfully running on the Port of ${PORT}`)
})