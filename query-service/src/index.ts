import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

const DATABASE: any[] = [];

app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(DATABASE);
});

const handleEvent = (type: string, data: any) => {
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
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log("Received event:", req.body.type);

  handleEvent(type, data);

  console.log({ DATABASE });

  res.send({});
});

const port = 3002;

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);

  // const events = await axios.get("http://localhost:3003/events");

  // console.log("Received events:", events.data);

  // for (let event of events.data) {
  //   console.log("Processing event:", event.type);
  //   handleEvent(event.type, event.data);
  // }
});
