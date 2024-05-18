<template>
</template>

<script setup>
import { ref, defineExpose } from 'vue';
import axios from 'axios';

defineExpose({ start });

function configCreater(method, data, route, token) {
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

async function parseResponse(method, data, route, token) {
  try {
    console.log(configCreater(method, data, route, token), 'config');
    return await request(configCreater(method, data, route, token));
  } catch (e) {
    console.error('Error while sending request', e);
    return { error: 'Error while sending request' };
  }
}
async function start(method, data, route, token) {
  const res = await parseResponse(method, data, route, token);
  return res;
}
</script>

<style lang="scss" scoped></style>
