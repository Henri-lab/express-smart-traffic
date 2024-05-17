var config = {
    method: 'get',
    url: 'http://localhost:3036/user/userSearch/id/5?id',
    headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'localhost:3036',
        'Connection': 'keep-alive'
    }
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

// #测试
// {
//     "insertID": 23,
//     "id": "5",
//     "username": "Betty",
//     "password": "$2a$08$dPmrBqPf5BaXvObJrSEtBO/Dk1CzqhhNLSWQa/3.XmM.K9QQTlJwa",
//     "type": "common-user",
//     "isOnline": 1
// }