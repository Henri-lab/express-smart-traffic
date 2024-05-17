var config_logout = {
  method: 'post',
  url: 'http://localhost:3036/auth/logout',
  headers: {
    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
    'Content-Type': 'application/json',
    Accept: '*/*',
    Host: 'localhost:3036',
    Connection: 'keep-alive',
  },
  data: JSON.stringify({}),
};

axios(config_logout)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

//#测试结果

// response.data:
// -------------------------
// {
//     "status": 1,
//     "msg": 'logout successful',
//     "auth": false,
//     "token": null
// }
