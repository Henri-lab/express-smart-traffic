// // 测试数据
var user_login_test = {
  id: '_id',
  username: '_username',
  password: '_password',
  type: '_type',
  isOnline: false,
};

interface user_login {
  id: string;
  username: string;
  password: string;
  type: string;
  isOnline: boolean;
}
let user_login: user_login = user_login_test;
let user_login_json = JSON.stringify(user_login);

//config request
function config_login(data: user_login) {
  return {
    method: 'post',

    url: 'http://localhost:3036/auth/login',
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
axios(config_login(user_register_test))
  .then(function (response) {
    console.log(JSON.stringify('response_login_test:', response.data));
  })
  .catch(function (error) {
    console.log('response_login_test fail', error);
  });
//#测试结果
// data:
// ----------------------------------------------
// {
//     "id": "50",
//     "username": "David@602a04",
//     "password": "n*ZsSFXgX",
//     "type": "root",
//     "isOnline": true
// }
// response.data:
// ----------------------------------------------
// {
//     "status": 1,
//     "msg": "login successful",
//     "auth": true,
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwIiwiaWF0IjoxNzE1OTEzNjQ0LCJleHAiOjE3MTYwMDAwNDR9.bU6eFxFBPUeaDmcxuF20YTfiDpGuSKRMyMQx0CPIrgQ"
// }

// {
//     "status": 0,
//     "err": "No user found",
//     "auth": false,
//     "token": null
// }

// {
//     "status": 0,
//     "err": "wrong password",
//     "auth": false,
//     "token": null
// }
