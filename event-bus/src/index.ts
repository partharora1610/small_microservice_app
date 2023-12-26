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
  // We are using this abhi tak
  axios.post("http://localhost:3001/events", event).catch((err) => {
    console.log(err.message);
  });

  // This is to the QueryService it will update the sturtcure and show with the pending state
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

const port = 3003;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
