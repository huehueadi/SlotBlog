import mongoose from "mongoose";


const connectionDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
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
    process.exit(1);
  }
};

export default connectionDatabase;
