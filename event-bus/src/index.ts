import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("Event received:", event);

  // This is to the PortService
  axios.post("http://localhost:3000/events", event).catch((err) => {
    console.log(err.message);
  });

  // This is to the CommentsService
  axios.post("http://localhost:3001/events", event).catch((err) => {
    console.log(err.message);
  });

  // This is to the QueryService
  axios.post("http://localhost:3002/events", event).catch((err) => {
    console.log(err.message);
  });

  // This is to the ModerationService
  axios.post("http://localhost:3004/events", event).catch((err) => {
    console.log(err.message);
  });

  if (event.type === "CommentStatusUpdated") {
    // This the query service
    axios.post("http://localhost:3003/events", event).catch((err) => {
      console.log(err.message);
    });
  }

  res.send({
    status: "OK",
  });
});

const port = 3003;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
