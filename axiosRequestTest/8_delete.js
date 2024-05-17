var config_del = {
  method: 'post',
  url: 'http://localhost:3036/auth/delete',
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwIiwiaWF0IjoxNzE1OTEzNjQ0LCJleHAiOjE3MTYwMDAwNDR9.bU6eFxFBPUeaDmcxuF20YTfiDpGuSKRMyMQx0CPIrgQ',
    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
    'Content-Type': 'application/json',
    Accept: '*/*',
    Host: 'localhost:3036',
    Connection: 'keep-alive',
  },
};

axios(config_del)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

// #测试结果
// response.data:
// {
//     "status": 1,
//     "msg": "delete account successfully"
// }
