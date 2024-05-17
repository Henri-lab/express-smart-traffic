var config_del = {
   method: 'get',
   url: 'http://localhost:3036/user/userDelete/username/Betty?username',
   headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Host': 'localhost:3036',
      'Connection': 'keep-alive'
   }
};

axios(config_del)
   .then(function (response) {
      console.log(JSON.stringify(response.data));
   })
   .catch(function (error) {
      console.log(error);
   });

// #测试
// ---------------------------------------------
// {
//     "status": 1,
//     "msg": "delete Betty successfully"
// }
// {
//     "status": 0,
//     "err": "User not found"
// }