const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();

const messages = [];
const port = 3000;
let timeInterval = null;

app.use(bodyParser.json());

app.post('/messages', (req, res) => {
  if (!req.body.message) {
    return res.status(400).send('Message is required');
  }

  messages.push({
    message: req.body.message,
    time: moment(),
  });

  if (!timeInterval) {
    timeInterval = setInterval(function() {
      const now = moment();

      for (let i = 0; i < messages.length; i++) {
        if (now.diff(messages[i].time) >= 60000) {
          console.log(messages[i].message, now.diff(messages[i].time));
          messages.splice(i, 1);
        }
      }
    }, 10);
  }

  res.sendStatus(200);
});

app.listen(port, () => console.log(`Server listening on port ${port}...`));
