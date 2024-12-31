import express from 'express';
import cors from 'cors'; 
import router from './src/routes/authroutes.js';
import connectionDatabase from './src/config/dbConfig.js';

const app = express();

connectionDatabase();

app.use(cors({
  origin: "http://localhost:3001",  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Methods allowed for requests
  allowedHeaders: ['Content-Type', 'Authorization'],  // Headers allowed in requests
  credentials: true  // Allow cookies (credentials) to be sent and received
}));

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res)=> {
  return res.status(200).json({
    message: "Backend Working",
    success: true
  })
})

app.listen(9000, () => {
  console.log("Server started on port 9000");
});
