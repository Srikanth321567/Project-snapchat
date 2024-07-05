
import mongoose, { Connection } from "mongoose";
import { env } from 'node:process';

let isConnected:Connection | boolean = false;
const connectDatabase = async () => {
      if(isConnected){
        console.log('MongoDB is already connected');
        return isConnected;
      }
      try {
        const res = await mongoose.connect("mongodb+srv://satyasrikanth646:36SuSazQ4c7cr0LQ@cluster0.tqdntef.mongodb.net/");
        isConnected=res.connection;
        console.log('mongodb connected successfully');
        return isConnected;
      } catch (error) {
        console.log(error); 
        throw error;
      }
}
export default connectDatabase;