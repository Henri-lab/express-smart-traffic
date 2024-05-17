let data_me = JSON.stringify({
  id: '50',
  username: 'David@602a04',
  password: 'n*ZsSFXgX',
  type: 'root',
  isOnline: true,
});

let config_me = {
  method: 'get',
  url: 'http://localhost:3036/auth/me',
  headers: {
    //🔴
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwIiwiaWF0IjoxNzE1OTEzNjQ0LCJleHAiOjE3MTYwMDAwNDR9.bU6eFxFBPUeaDmcxuF20YTfiDpGuSKRMyMQx0CPIrgQ',
    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
    'Content-Type': 'application/json',
    
    Accept: '*/*',
    Host: 'localhost:3036',
    Connection: 'keep-alive',
  },
  data: data_me,
};

axios(config_me)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

//   response.data:
// {
//     "status": 1,
//     "data": {
//         "insertID": 34,
//         "id": "50",
//         "username": "David@602a04",
//         "password": "$2a$08$WpGGwo9mgPznkLZFno0hlurzVXiHXf6.KJXY9UyX9TQW5UKG6E9za",
//         "type": "root",
//         "isOnline": 1
//     }
// }
