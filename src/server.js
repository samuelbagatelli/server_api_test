const express = require('express');

const token = 649145569903242;

const app = express().use(bodyParser.json());

app.listen(1337, () => console.log(`API running on port 3000`));

app.get("/webhook", (req, res) => {
  const verify_token = "8wjKqY9YVA";

  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === verify_token) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', (req, res) => {
  let body = req.body;

  console.log(JSON.stringify(body, null, 2));

  res.status(200).json(body);
});
