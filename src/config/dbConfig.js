import mongoose from "mongoose";

const connectionDatabase = async () => {
  try {
    const mongoUri = "mongodb+srv://temploginoffice:3H0ksQJqzYvUsS0U@cluster0.x4ynk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    if (!mongoUri) {
      throw new Error("MongoDB URI is missing in environment variables.");
    }
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Database is connected");
  } catch (error) {
    console.error("Error while connecting to the Database", error);
    process.exit(1); // Exit process if the DB connection fails
  }
};

export default connectionDatabase;
