import express from 'express';
import cors from 'cors'; 
import router from './src/routes/authroutes.js';
import connectionDatabase from './src/config/dbConfig.js';

const app = express();

connectionDatabase();

app.use(cors({
  origin: "http://localhost:3001",  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true  
}));

app.use(express.json());
app.get('/',(req, res)=>{
  res.send("health")
});


app.set('trust proxy', true);

app.use("/api", router);



app.listen(9000, () => {
  console.log("Server started on port 9000");
});
