import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

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

app.post("/post/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const content = req.body.content;
  const newComment = { id: commentId, content };

  const comments = POSTDB[req.params.id as keyof typeof POSTDB] || [];

  comments.push(newComment);
  POSTDB[req.params.id as keyof typeof POSTDB] = comments;

  // This is to the event bus service
  await axios.post("http://localhost:3003/events", {
    type: "CommentCreated",
    data: {
      ...newComment,
      postId: req.params.id,
    },
  });

  res.status(201).send(newComment);
});

app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);

  res.send({});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
