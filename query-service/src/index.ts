import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const DATABASE: any[] = [];

app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(DATABASE);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log("Received event:", req.body.type);

  if (type === "PostCreated") {
    const { id, title } = data;
    DATABASE.push({ id, title, comments: [] });
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = DATABASE.find((post) => post.id === postId);

    const newComment = { id, content, status };

    post.comments.push(newComment);
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = DATABASE.find((post) => post.id === postId);

    const comment = post.comments.find((comment: any) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }

  console.log({ DATABASE });

  res.send({});
});

const port = 3002;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
