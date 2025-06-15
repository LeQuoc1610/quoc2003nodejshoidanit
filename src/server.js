import express from "express"; 
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine.js";
import initWebRouters from './route/web.js';
import dotenv from 'dotenv'; 
import { connectDB } from './config/connectDB.js'; 
import cors from 'cors'

dotenv.config(); 

let app = express();
app.use(cors({ credentials: true, origin: true }));
// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB(); // Kết nối cơ sở dữ liệu

let port = process.env.PORT;

app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
