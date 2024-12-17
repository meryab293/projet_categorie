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

const initializeTables = async () => {
    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE
      );
    `;
  
    const createProjectsTable = `
      CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category_id INT REFERENCES categories(id)
      );
    `;
  
    try {
      await pool.query(createCategoriesTable);
      await pool.query(createProjectsTable);
      console.log("basedonné crée ou existe déjà .");
    } catch (err:any) {
      console.error("erreur de creation de tables en db:", err.message);
      process.exit(1);
    }
  };

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
    await initializeTables();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    });
  } catch (err:any) {
    console.error("Error starting the server:", err.message);
  }
};

startServer();

export default pool;