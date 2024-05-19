<template></template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

defineExpose({ auth_start, user_start });
function request(config) {
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function auth_configCreater(method, data, route, token) {
  return {
    method,
    url: `http://localhost:3036/auth${route}`,
    headers: {
      Accept: '*/*',
      Authorization: token || '',
    },
    data,
    withCredentials: true, // 如果需要发送跨域 Cookie
  };
}

function user_configCreater({
  method = 'GET',
  data = {},
  route = '/',
  params = {},
  baseURL = 'http://localhost:3036',
}) {
  const validMethods = [
    'get',
    'post',
    'put',
    'delete',
    'patch',
    'head',
    'options',
  ];
  const normalizedMethod =
    method && typeof method === 'string' ? method.toLowerCase() : 'get';
  if (!validMethods.includes(normalizedMethod)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }
  return {
    method: normalizedMethod,
    url: `${baseURL}/user${route}`,
    headers: {
      Accept: '*/*',
    },
    data,
    params,
    withCredentials: true, // 如果需要发送跨域 Cookie
  };
}

// auth api
async function auth_response(method, data, route, token) {
  try {
    console.log(auth_configCreater(method, data, route, token), 'axios-config');
    return await request(auth_configCreater(method, data, route, token));
  } catch (e) {
    console.error('Error while sending request', e);
    return { status: 0, err: 'Error while sending request' };
  }
}
async function auth_start(method, data, route, token) {
  const res = await auth_response(method, data, route, token);
  console.log(res, 'axios-response');
  return res;
}
// user api
async function user_response({ method, data, route, params }) {
  try {
    console.log(
      user_configCreater({ method, data, route, params }),
      'axios-user-config'
    );
    return await request(user_configCreater({ method, data, route, params }));
  } catch (e) {
    console.error('Error while sending request', e);
    return { status: 0, err: 'Error while sending request' };//失败返回的最后一层的status最重要
  }
}
async function user_start({ method, data, route, params }) {
  const res = await user_response({ method, data, route, params });
  console.log(res, 'axios-user-response');
  return res;
}
</script>

<style lang="scss" scoped></style>
