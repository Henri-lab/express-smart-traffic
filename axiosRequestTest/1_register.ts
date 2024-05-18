import axios from 'axios';
// // 测试数据
var user_register_test = {
  id: '_id',
  username: '_username',
  password: '_password',
  type: '_type',
  isOnline: false,
};

interface user_register {
  id: string;
  username: string;
  password: string;
  type: string;
  isOnline: boolean;
}
let user_register: user_register = user_register_test;
let user_register_json = JSON.stringify(user_register);

//config request
function config_register(data: user_register) {
  return {
    method: 'post',
    url: 'http://localhost:3036/auth/register',
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json',
      Accept: '*/*',
      Host: 'localhost:3036',
      Connection: 'keep-alive',
    },
    data: user_register_json,
  };
}

//send request
axios(config_register(user_register_test))
  .then(function (response) {
    console.log(JSON.stringify('response_register_test:', response.data));
  })
  .catch(function (error) {
    console.log('response_register_test fail', error);
  });

//#测试结果
// data:
// ----------------------------------------------
// {
//     "id": "2",
//     "username": "David",
//     "password": "n*ZsSFXgX",
//     "type": "root",
//     "isOnline": true,
// }

// response.data:
// ----------------------------------------------
// {
//     "status": 1,
//     "msg": "User registered successfully",
//     "data": {
//         "insertID": 31,
//         "mysqlUsername": "David"
//     }
// }
// ----------------------------------------------
// {
//     "status": 0,
//     "err": "username has existed!"
// }
