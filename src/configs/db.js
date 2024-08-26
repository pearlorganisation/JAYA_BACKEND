import mongoose from "mongoose";
import chalk from "chalk";
const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: false,
      useUnifiedTopology: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    const uri = process.env.MONGO_URI;
    mongoose
      .connect(uri)
      .catch((error) => console.log(error))
      .then(() => {
        console.log(chalk.bgMagentaBright("MONGODB CONNECTED SUCCESSFULLY!"));
      });
  } catch (error) {
    return error;
  }
};

export default connectDB;
