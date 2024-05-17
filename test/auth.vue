<template>
  <div>
    <slot :response="response"></slot>
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps(['start', 'route', 'token', 'data', 'headers']);
defineExpose({ start });
const data = JSON.stringify(props.data);
const isStart = ref(props.start);
const response = ref({});

function configCreater(data, route, token) {
  return {
    method: 'post',
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

async function parseResponse(data, route, token) {
  try {
    console.log(configCreater(data, route, token), 'config');
    return await request(configCreater(data, route, token));
  } catch (e) {
    console.error('Error while sending request', e);
    return { error: 'Error while sending request' };
  }
}
async function start(data, route, token) {
  console.log('start sending request');
  response.value = await parseResponse(data, route, token);
  console.log(response.value, 'response');
}

onMounted(async () => {
  // start(data, props.route, props.token)
  // test
  // const res = await start(
  //   JSON.stringify({
  //     id: '54',
  //     username: 'Joseph',
  //     password: 'QkVhi8A5',
  //     type: 'root',
  //     isOnline: true,
  //   }),
  //   'register',
  //   ''
  // );
});

// watch(
//   () => isStart.value,
//   (newValue) => {
//     console.log('ss');
//     console.log('Watching for changes');
//     if (newValue) {
//       start(data, props.route, props.token);
//     }
//   },
//   { immediate: true }
// );
</script>

<style lang="scss" scoped></style>
