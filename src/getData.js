import fetch from 'isomorphic-fetch';
export default function getData() {
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
    return pc;
    console.log(pc);
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });
}
