var axios = require('axios');
// // 测试数据
var user_registerForce_test = {
  id: '_id',
  username: '_usernameDuplicated',
  password: '_password',
  type: '_type',
  isOnline: false,
};

interface user_registerForce {
  id: string;
  username: string;
  password: string;
  type: string;
  isOnline: boolean;
}
let user_registerForce: user_registerForce = user_registerForce_test;
let user_registerForce_json = JSON.stringify(user_registerForce);

//config request
function config_registerForce(data: user_registerForce) {
  return {
    method: 'post',
    url: 'http://localhost:3036/auth/registerForce',
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json',
      Accept: '*/*',
      Host: 'localhost:3036',
      Connection: 'keep-alive',
    },
    data: user_registerForce_json,
  };
}

//send request
axios(config_registerForce(user_registerForce_test))
  .then(function (response) {
    console.log(JSON.stringify('response_registerForce_test:', response.data));
  })
  .catch(function (error) {
    console.log('response_registerForce_test', error);
  });

//#
// 用户名重复
// data:
// ----------------------------------------------
// {
//     "id": "50",
//     "username": "David",
//     "password": "n*ZsSFXgX",
//     "type": "root",
//     "isOnline": true,
// }
// response：
// ----------------------------------------------
//   {
//     "status": 1,
//     "msg": "User registered_force successfully",
//     "data": {
//         "mysqlUsername": "David@602a04"
//     }
//  }
