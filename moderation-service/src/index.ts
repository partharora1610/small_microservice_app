import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.use(bodyParser.json());

// This is being triggered from the event bus with the comment data
app.post("/events", (req, res) => {
  console.log("Received event:", req.body.type);
  console.log("From the modeation service");

  const { type, data } = req.body;
  const { id, postId, content } = data;
  console.log(req.body.type);

  if (type === "CommentCreated") {
    const status = content.includes("orange") ? "rejected" : "approved";
    console.log("CommentCreated status:", status);

    setTimeout(async () => {
      await axios.post("http://localhost:3001/moderation", {
        type: "CommentUpdated",
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
