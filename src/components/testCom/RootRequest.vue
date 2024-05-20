<template>
  <div class="root-request">
    <axios-config ref="config_user"></axios-config>
    <button @click="getAllUsers">all users</button>
    <!-- 权限警告 -->
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <v-alert
        v-if="isWarn"
        border="top"
        type="warning"
        variant="outlined"
        prominent
      >
        只有管理员才能够查看
      </v-alert>
    </transition>
    <v-sheet class="mx-auto" width="600">
      <v-form validate-on="submit lazy" @submit.prevent="submitHandle">
        <v-text-field
          v-model="userName"
          :rules="rules"
          label="Username"
        ></v-text-field>

        <v-btn
          :loading="loading"
          class="me-4"
          text="search"
          type="submit"
        ></v-btn>
      </v-form>
    </v-sheet>
    <br />
    <div class="userList">
      <v-row align="center" justify="center" dense>
        <!-- 响应式网格布局 -->
        <v-col cols="12" v-for="user in usersAllList" :key="user.id">
          <v-card
            append-icon="mdi-check"
            class="mx-auto"
            prepend-icon="mdi-account"
            :title="user.username"
            :subtitle="translate(user.type)"
          >
            <template v-slot:prepend>
              <v-icon
                :color="Color_type(user.type)"
                icon="mdi-account"
              ></v-icon>
            </template>
            <template v-slot:append>
              <v-icon
                :color="Color_isOnline(user.isOnline)"
                :icon="Emoji_isOnline(user.isOnline)"
              ></v-icon>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AxiosConfig from './AxiosConfig.vue';
import 'animate.css';

const isWarn = ref(false);
const config_user = ref(null);
const loading = ref(false);
const userName = ref('');
const rules = [
  (value) => checkApi(value),
  (value) =>
    /^[^\u4E00-\u9FFF]*$/.test(value) || 'No Chinese characters allowed.',
];

const warnHandler = () => {
  isWarn.value = true;
  setTimeout(() => {
    isWarn.value = false;
  }, 3000);
};
async function submitHandle() {
  loading.value = true;

  // Simulating an API request
  setTimeout(async () => {
    const result = await getUsersByName(userName.value);
    loading.value = false;
  }, 1000);
}

function checkApi(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!value) {
        return resolve('Please enter a user name.');
      }
      if (value.length >= 20) {
        return resolve('username 应当不超过20个字符.');
      }
      if (!/^[^\u4E00-\u9FFF]*$/.test(value) || userName.value.length >= 20) {
        return resolve('User name invalid.');
      }
      return resolve(true);
    }, 1000);
  });
}

async function getCurrentUserType() {
  const result = [];
  localStorageManager('get', 'Authorization-', result);
  if (result.length == 0) return 'unkonwn';
  const username = result[0].id;
  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/username',
      params: { username },
    };
    const res = await config_user.value.user_start(config);
    if (res.status) {
      return res.data.type;
    }
  }
}

const usersAllList = ref([]);
function translate(type) {
  switch (type) {
    case 'root':
      return '管理员';
    case 'common':
      return '普通用户';
    case 'manager':
      return '交通管理员';
    default:
      return;
  }
}
async function getAllUsers() {
  // 管理员特权
  // if (getCurrentUserType() !== 'root') {
  //   warnHandler();
  //   return 0;
  // }
  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/all',
    };
    const res = await config_user.value.user_start(config);
    if (res.status) {
      usersAllList.value = res.data;
    } else
      usersAllList.value = [{ id: 0, username: 'unkonwn', type: 'unkonwn' }];
  }
}
function Color_type(type) {
  switch (type) {
    case 'root':
      return 'red';
    case 'common':
      return 'blue';
    case 'manager':
      return 'yellow';
    default:
      return;
  }
}
function Color_isOnline(isOnline) {
  switch (isOnline) {
    case 1:
      return 'green';
    case 0:
      return 'red';
    default:
      return;
  }
}
function Emoji_isOnline(isOnline) {
  switch (isOnline) {
    case 1:
      return 'mdi-emoticon-excited-outline';
    case 0:
      return 'mdi-emoticon-dead-outline';
    default:
      return;
  }
}
async function getUsersByType(type) {
  // if (getCurrentUserType() !== 'root') {
  //   warnHandler();
  //   return 0;
  // }

  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/type',
      params: { type },
    };
    await config_user.value.user_start(config);
  }
}
async function getUsersByName(username) {
  // if (getCurrentUserType() !== 'root') {
  //   warnHandler();
  //   return 0;
  // }
  usersAllList.value = [];
  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/username',
      params: { username },
    };
    console.log(usersAllList.value,'ss');
    usersAllList.value = await config_user.value.user_start(config);
  }
}

onMounted(async () => {});

// util---------------------------------------------------------------------------
// --本地存储
const removeLocalStorageItemsByPrefix = (prefix) => {
  // 从后往前遍历以避免索引问题💥
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.auth_startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  }
};

const setLocalStorageItems = (prefix, sourceArr = []) => {
  // 先删除所有以指定前缀开头的项
  removeLocalStorageItemsByPrefix(prefix);
  // 存储新的项
  sourceArr.forEach((obj) => {
    // 修改原有元素的属性
    const key = prefix;
    const value = JSON.stringify(obj);
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item with key ${key}`, error);
    }
  });
};

const getLocalStorageItemsByPrefix = (prefix, resultArr = []) => {
  // 初始化resultArray作为参数，避免外部arr的副作用
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.auth_startsWith(prefix)) {
      const id = key.substring(prefix.length);
      try {
        const item = JSON.parse(localStorage.getItem(key));
        // bug🚩
        if (!resultArr.some((obj) => obj.id === id)) {
          resultArr.push(item);
        }
      } catch (error) {
        console.error(`Error parsing item with key ${key}`, error);
      }
    }
  }
  return resultArr; // 返回结果数组
};

function localStorageManager(type, predix, arr) {
  switch (type) {
    case 'set':
      setLocalStorageItems(predix, arr);
    case 'get':
      arr = getLocalStorageItemsByPrefix(predix, arr);
      // arr为结果集
      return arr;
    case 'clear':
      removeLocalStorageItemsByPrefix(predix);
      break;
    default:
      // 处理未知的type
      console.log('localStorageManager参数异常');
      return null;
  }
}
</script>

<style lang="scss" scoped></style>
