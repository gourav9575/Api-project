import mongoose from "mongoose";
import dotenv from "dotenv";
import log from "../logger/logger";
dotenv.config();
const Url= process.env.DB_CONNECT||"mongodb+srv://registrationdb:gourav@cluster0.4yiea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
function  connect(){

  mongoose.connect(Url,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify:true,
    })
    .then(() => {
      log.info("Database connected");
      console.log("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      console.log(error);
      process.exit(1);
    });
}

export default connect;