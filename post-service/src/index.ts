import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3000;

const POSTDB: any = {};

app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(POSTDB);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  POSTDB[id] = {
    id,
    title,
  };

  res.status(201).send(POSTDB[id]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
