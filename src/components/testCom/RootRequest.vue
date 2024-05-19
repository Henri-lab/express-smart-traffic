<template>
  <div class="root-request">
    <axios-config ref="config_user"></axios-config>
    <button @click="getAllUsers">获取所有用户信息</button><br />
    <button @click="getUsersByType('root')">获取所有root用户信息</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AxiosConfig from './AxiosConfig.vue';

const config_user = ref(null);

async function getAllUsers() {
  // 获得所有用户信息
  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/all',
      params: { all: true },
    };
    await config_user.value.user_start(config);
  }
}
async function getUsersByType(type) {
  // 获得所有用户信息
  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/type',
      params: { type },
    };
    await config_user.value.user_start(config);
  }
}
onMounted(async () => {});
</script>

<style lang="scss" scoped></style>
