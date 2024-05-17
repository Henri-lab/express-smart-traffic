let data_pw = JSON.stringify({
  currentPassword: 'n*ZsSFXgX',
  newPassword: 'JF7iMu9?LZ0?Yjd7n',
});

let config_pw = {
  method: 'post',
  url: 'http://localhost:3036/auth/password',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwIiwiaWF0IjoxNzE1OTEzNjQ0LCJleHAiOjE3MTYwMDAwNDR9.bU6eFxFBPUeaDmcxuF20YTfiDpGuSKRMyMQx0CPIrgQ',
    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
    'Content-Type': 'application/json',
    Accept: '*/*',
    Host: 'localhost:3036',
    Connection: 'keep-alive',
  },
  data: data_pw,
};

axios(config_pw)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

//#测试结果
// data:
// ------------------------------------------
// {
//     "currentPassword": "n*ZsSFXgX",
//     "newPassword": "JF7iMu9?LZ0?Yjd7n"
// }
// response.data:
// ------------------------------------------
// {
//     "status": 1,
//     "msg": "password updated"
// }

// {
//     "status": 0,
//     "err": "Current password is incorrect"
// }
