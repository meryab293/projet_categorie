import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { Pool } from "pg";


dotenv.config();


const pool = new Pool({
  host:  "localhost", 
  port:  5432,
  user: "postgres",
  password: "",
  database: "db_project",
});

const app = express();
const port= 3001;


app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});



const startServer = async () => {
  try {
    await pool.connect();
    console.log("Connected.");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    });
  } catch (err:any) {
    console.error("Error starting the server:", err.message);
  }
};

startServer();

export default pool;