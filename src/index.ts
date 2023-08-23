import express, { Express } from "express";
import dotenv from "dotenv";
import { connect } from "./services/db";
import routes from "./routes/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// routes
app.use(routes);

// databases connected
connect();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
