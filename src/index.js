import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const sum = parseInt(req.query.a || 0, 10) + parseInt(req.query.b || 0, 10);
  res.send(sum.toString());
});

app.get('/task2B', (req, res) => {
  const fullname = req.query.fullname.trim() || '     ';
  const array = fullname.split(' ');
  const re = /^.*[\d_/-].*$/;
  if (fullname.match(re)) {
    res.send('Invalid fullname');
  } else {
    switch (array.length) {
      case 3:
        res.send(array[2] + ' ' + array[0].charAt(0) + '. ' + array[1].charAt(0) + '.');
        break;
      case 2:
        res.send(array[1] + ' ' + array[0].charAt(0) + '.');
        break;
      case 1:
        res.send(array[0]);
        break;
      default:
        res.send('Invalid fullname');
    }
  }
});

app.get('/task2C', (req, res) => {
  const username = req.query.username;
  let result = username;
  if (result.indexOf('/') >= 0) {
    const pattern = /\/([\w\d?=/-]*)$/gi;
    const match = pattern.exec(username);
    result = match[1];
  }
  if (result.indexOf('?') >= 0) {
    result = result.substring(0, result.indexOf('?'));
  }
  if (result.indexOf('/') >= 0) {
    result = result.substring(0, result.indexOf('/'));
  }
  if (result.indexOf('@') !== 0) {
    result = '@' + result;
  }
  res.send(result);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
