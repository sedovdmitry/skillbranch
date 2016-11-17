import express from 'express';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import cors from 'cors';

const app = express();
app.use(cors());

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
  const regExp = /(https?:)?(\/\/)?(www\.)?([a-z0-9\-][^\/]*\/)?(@)?([a-z0-9][\.]*[\-]*[\_]*[^\/]+)/i;
  const username = query.match(regExp);
  res.send('@'+username[6]);
});

// task3A

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

app.get(/\/task3A(.*)/, (req, res) => {
  function checkData(data) {
    if (data === '' || data === undefined) {
      return res.status(404).send('Not Found');
    } else {
      return res.json(data);
    }
  }
  console.log(req.path);
  let arr = req.path.split('/');
  arr.splice(0, 2);
  arr = arr.filter(function(n){ return n != '' });
  const length = arr.length;
  console.log(`length = ${length}`);
  if (arr[0] === 'volumes') {
    let sumC = 0;
    let sumD = 0;
    for (const element of pc.hdd) {
      if (element.volume === 'C:') {
        sumC += element.size;
      } else if (element.volume === 'D:') {
        sumD += element.size;
      }
    }
    res.json({"C:":`${sumC}B`,"D:":`${sumD}B`});
  } else if (_.includes(arr, 'length')) {
      res.status(404).send('Not Found');
  } else {
    switch (length) {
      case 1:
        try {
          pc[arr[0]];
        } catch (err) {
          console.log('err', err);
          return res.status(404).send('Not Found');
        }
        checkData(pc[arr[0]]);
        break;
      case 2:
        try {
          pc[arr[0]][arr[1]];
        } catch (err) {
          console.log('err', err);
          return res.status(404).send('Not Found');
        }
        checkData(pc[arr[0]][arr[1]]);
        break;
      case 3:
        try {
          pc[arr[0]][arr[1]][arr[2]];
        } catch (err) {
          console.log('err', err);
          return res.status(404).send('Not Found');
        }
        checkData(pc[arr[0]][arr[1]][arr[2]]);
        break;
      default:
        res.json(pc);
    }
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
