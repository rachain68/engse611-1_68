const url = require('url');

const url_str = ('https://example.com/users?page=1&limit=10');

const myUrl = new URL(url_str);

console.log(url_str);          
console.log(myUrl.hostname);      // example.com
console.log(myUrl.pathname);      // /users
console.log(myUrl.searchParams.get('page')); // 1
console.log(myUrl.searchParams.get('limit')); // 10