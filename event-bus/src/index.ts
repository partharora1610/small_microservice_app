import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const events: any[] = [];

app.post("/events", (req, res) => {
  const event = req.body;

  // Add the event to the events array
  events.push(event);

  // This is to the PortService
  axios.post("http://localhost:3000/events", event).catch((err) => {
    console.log(err.message);
  });

  // This sthe the CommentService
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

  res.send({
    status: "OK",
  });
});

app.get("/events", (req, res) => {
  res.send(events);
});

const port = 3003;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
