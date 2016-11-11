export default function username(url) {
  let result = url;
  if (result.indexOf('/') >= 0) {
    const pattern = /\/([\w\d?=/-]*)$/gi;
    const match = pattern.exec(url);
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
  return result;
}
