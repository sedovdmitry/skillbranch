export default function username(url) {
  const re = new RegExp('@?(https?:)?(\/\/)?((telegram|vk|vkontakte|www.vk|twitter|www.twitter|github)[^\/]*\/)?([a-zA-Z0-9.]*)', 'i');
	const result = url.match(re)[5];
	return '@' + result;
}
