import express, { Express } from "express";
import dotenv from "dotenv";
import { connect } from "./services/db";
import routes from "./routes/routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

// databases connected
connect();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
