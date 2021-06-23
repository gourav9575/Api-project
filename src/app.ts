import express from "express";
import dotenv from "dotenv";
import log from "./logger/logger";
import connect from "./database/connection";
import routes from "./routers";
dotenv.config();

const app = express();

const port= process.env.PORT || 7000


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen( port,() => {
  
  log.info(`Server listing at http://localhost:${port}`);
  console.log(`Server is running at http://localhost:${port}`);

  connect();

  routes(app);
}); 