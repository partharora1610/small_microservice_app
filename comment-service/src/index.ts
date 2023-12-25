import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { randomBytes } from "crypto";

const app = express();

const port = 3001;

const POSTDB: any = {
  "1": [
    {
      id: "1",
      content: "Hello World",
    },
  ],
};

app.use(bodyParser.json());
app.use(cors());

app.get("/post/:id/comments", (req, res) => {
  res.send(POSTDB[req.params.id as keyof typeof POSTDB] || []);
});

app.post("/post/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const content = req.body.content;
  const newComment = { id: commentId, content };

  const comments = POSTDB[req.params.id as keyof typeof POSTDB] || [];

  comments.push(newComment);
  POSTDB[req.params.id as keyof typeof POSTDB] = comments;

  res.status(201).send(newComment);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
