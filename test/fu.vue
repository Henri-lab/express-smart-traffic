<template>
  <div>
    <auth
      ref="child"
      :data="data.value"
      :route="route.value"
      :token="token.value"
    >
      <template #default="{ response }">
        <div>
          <p>Response: {{ response }}</p>
        </div>
      </template>
    </auth>
    <button class="start" @click="start">start</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import auth from './auth.vue';

const child = ref(null);

const data = ref({
  id: '1',
  username: 'user1',
  password: 'pw1',
  type: 'root',
  isOnline: false,
});
const route = ref('/login');
const token = ref('');
const response = ref({});

onMounted(() => {
  start.value = false;
});

function start() {
  if (child.value) {
    child.value.start(data.value, route.value, token.value);
  }
}
</script>

<style lang="scss" scoped></style>
