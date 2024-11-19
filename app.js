import express from 'express'
import router from './src/routes/authroutes.js'
import connectionDatabase from './src/config/dbConfig.js'

const app = express()
connectionDatabase()

app.use(express.json())

app.use("/api", router)

app.listen(9000, ()=>{
    console.log("Server Started")
})