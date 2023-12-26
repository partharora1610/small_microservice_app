import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  const { id, postId, content } = data;

  if (type === "CommentCreated") {
    const status = content.includes("orange") ? "rejected" : "approved";

    setTimeout(async () => {
      await axios.post("http://localhost:3003/events", {
        type: "CommentModerated",
        data: {
          id,
          postId,
          status,
          content,
        },
      });
    }, 10000);
  }

  res.send({});
});

const port = 3004;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
