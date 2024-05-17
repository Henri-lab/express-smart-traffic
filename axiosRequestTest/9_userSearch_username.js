const { response } = require("express");

var data_search = '';

var config_search = {
    method: 'get',
    url: 'http://localhost:3036/user/userSearch/username/Betty?username',
    headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'localhost:3036',
        'Connection': 'keep-alive'
    },
    data: data_search,
    // params: {
    //     username: 'Betty'
    // }
};

axios(config_search)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

// #测试
// response.data:
// {
//     "status": 1,
//     "data": {
//         "insertID": 23,
//         "id": "5",
//         "username": "Betty",
//         "password": "$2a$08$dPmrBqPf5BaXvObJrSEtBO/Dk1CzqhhNLSWQa/3.XmM.K9QQTlJwa",
//         "type": "common-user",
//         "isOnline": 1
//     }
// }

// {
//     "status": 0,
//     "err": "User not found"
// }