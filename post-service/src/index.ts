import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const POSTDB: any = {};

app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(POSTDB);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  POSTDB[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:3003/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(POSTDB[id]);
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);

  res.send({});
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
