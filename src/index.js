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
  const query = req.query.username;
  const regExp = new RegExp('(https?:)?(\/\/)?(www\.)?([a-z0-9\-][^\/]*\/)?(@)?([a-z0-9][\.]*[\-]*[\_]*[^\/]+)', 'i');
  const username = query.match(regExp);
  res.send('@'+username[6]);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
