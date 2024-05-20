<template>
  <div class="root-request">
    <axios-config ref="config_user"></axios-config>
    <!-- 权限警告 -->
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <v-alert
        class="warning"
        v-if="isWarn"
        border="top"
        type="warning"
        variant="outlined"
        prominent
      >
        只有管理员才能够进行此项操作
      </v-alert>
    </transition>
    <!-- 用户不存在警告 -->
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <v-alert
        class="warning"
        v-if="isExist"
        border="top"
        type="warning"
        variant="outlined"
        prominent
      >
        该用户不存在
      </v-alert>
    </transition>
    <!-- 删除失败警告 -->
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <v-alert
        class="warning"
        v-if="isDeleted"
        border="top"
        type="warning"
        variant="outlined"
        prominent
      >
        删除用户失败
      </v-alert>
    </transition>
    <!-- 删除成功 -->
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <v-alert
        class="success"
        v-if="isDeletedSuccess"
        border="top"
        type="success"
        variant="outlined"
        prominent
      >
        删除用户成功
      </v-alert>
    </transition>
    <!-- 查找用户 -->
    <!-- 搜索 -->
    <v-sheet class="mx-auto search" width="600">
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
          v-ripple
        ></v-btn>
        <v-btn
          :loading="loading_All"
          class="me-4"
          text="全部用户"
          @click="searchAllUsersHandler"
          v-ripple
        ></v-btn>
      </v-form>
    </v-sheet>
    <!-- 条件过滤 -->
    <v-sheet class="py-4 px-1 filter">
      <v-chip-group selected-class="text-pink" multiple>
        <v-chip
          v-for="tag in tags"
          :key="tag"
          :text="tag"
          @click="tagHandler(tag)"
        ></v-chip>
      </v-chip-group>
    </v-sheet>
    <br />
    <!-- 用户列表 -->
    <div class="userList">
      <v-container>
        <v-row align="center" justify="center" dense>
          <!-- 响应式网格布局 -->
          <v-col cols="12" v-for="user in paginatedUsers" :key="user.id">
            <v-card
              append-icon="mdi-check"
              class="mx-auto"
              prepend-icon="mdi-account"
              :title="user.username"
              :subtitle="translate(user.type)"
              @mouseover="isTrashShow = user.id"
              @mouseleave="isTrashShow = -1"
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
                <v-btn
                  icon="mdi-delete-alert"
                  variant="outlined"
                  color="red"
                  size="30"
                  v-show="isTrashShow === user.id"
                  @click="deleteUserHandler(user.username)"
                >
                </v-btn>
              </template>
            </v-card>
          </v-col>
        </v-row>
        <!-- 分页 -->
        <v-pagination
          v-model="page"
          :length="pageCount"
          rounded="circle"
        ></v-pagination>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AxiosConfig from './AxiosConfig.vue';
import 'animate.css';

const usersAllList = ref([]);
const page = ref(1);
const itemPerPage = ref(10);
const pageCount = computed(() => {
  return Math.ceil(usersAllList.value.length / itemPerPage.value);
});
const paginatedUsers = computed(() => {
  const start = (page.value - 1) * itemPerPage.value;
  const end = start + itemPerPage.value;
  return usersAllList.value.slice(start, end);
});
const isTrashShow = ref(false);
const isWarn = ref(false);
const isExist = ref(false);
const isDeleted = ref(false);
const isDeletedSuccess = ref(false);
const config_user = ref(null);
const loading = ref(false);
const loading_All = ref(false);
const userName = ref('');
const rules = [
  (value) => checkApi(value),
  (value) =>
    /^[^\u4E00-\u9FFF]*$/.test(value) || 'No Chinese characters allowed.',
];
const tags = ['高级管理员', '普通用户', '交通管理员', '在线', '离线'];
const activeTags = ref([]); // 当前激活的过滤条件
const usersAllListCopy = ref([]);
function tagHandler(tag) {
  // console.log(JSON.stringify(activeTags.value), 'activeTags'); //调试问题
  toggleActiveTags(tag);
  // 计算过滤后的用户列表
  // 每次过滤的都是完整数据
  usersAllList.value = usersAllListCopy.value.filter(isfilter);
}
// 正正抵消
const toggleActiveTags = (tag) => {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter((filter) => filter !== tag);
  } else {
    activeTags.value.push(tag);
  }
};

// 多重过滤 (没有break)
const isfilter = (user) => {
  return activeTags.value.every((tag) => {
    switch (tag) {
      case '高级管理员':
        return user.type === 'root';
      case '普通用户':
        return user.type === 'common';
      case '交通管理员':
        return user.type === 'traffic';
      case '在线':
        return user.isOnline === 1;
      case '离线':
        return user.isOnline === 0;
      default:
        return true;
    }
  });
};

const warnHandler = () => {
  isWarn.value = true;
  const time = setTimeout(() => {
    isWarn.value = false;
    clearTimeout(time);
  }, 3000);
};
const warnHandler_isExistUser = () => {
  isExist.value = true;
  const time = setTimeout(() => {
    isExist.value = false;
    clearTimeout(time);
  }, 3000);
};
const warnHandler_isDeleted = () => {
  isDeleted.value = true;
  const time = setTimeout(() => {
    isDeleted.value = false;
    clearTimeout(time);
  }, 3000);
};
const warnHandler_isDeletedSuccess = () => {
  isDeletedSuccess.value = true;
  const time = setTimeout(() => {
    isDeletedSuccess.value = false;
    clearTimeout(time);
  }, 3000);
};
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

function translate(type) {
  switch (type) {
    case 'root':
      return '管理员';
    case 'common':
      return '普通用户';
    case 'traffic':
      return '交通管理员';
    default:
      return;
  }
}

async function searchAllUsersHandler() {
  loading_All.value = true;
  // Simulating an API request
  setTimeout(async () => {
    await getAllUsers();
    loading_All.value = false;
  }, 1000);
  loading_All.value = true;
}
async function getAllUsers() {
  // 管理员特权
  const type = await getCurrentUserType();
  if (type !== 'root') {
    warnHandler();
    return 0;
  }
  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/all',
    };
    const res = await config_user.value.user_start(config);
    if (res.status) {
      usersAllList.value = res.data;
      usersAllListCopy.value = usersAllList.value;
    } else {
      usersAllList.value = [{ id: 0, username: 'unkonwn', type: 'unkonwn' }];
      usersAllListCopy.value = usersAllList.value;
    }
  }
}
function Color_type(type) {
  switch (type) {
    case 'root':
      return 'red';
    case 'common':
      return 'blue';
    case 'traffic':
      return 'purple';
    default:
      return;
  }
}
function Color_isOnline(isOnline) {
  switch (isOnline) {
    case 1:
      return 'green';
    case 0:
      return 'gray';
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

async function deleteUserHandler(username) {
  // 管理员特权
  const type = await getCurrentUserType();
  if (type !== 'root') {
    warnHandler();
    return 0;
  }
  if (config_user.value) {
    const config = {
      method: 'POST',
      route: '/delete/username',
      params: { username },
    };
    const res = await config_user.value.user_start(config);
    if (res.status) {
      warnHandler_isDeletedSuccess();
      await getAllUsers();
    } else {
      warnHandler_isDeleted();
    }
  }
}

async function submitHandle() {
  loading.value = true;
  // Simulating an API request
  setTimeout(async () => {
    const result = await getUsersByName(userName.value);
    loading.value = false;
  }, 1000);
}
async function getUsersByName(username) {
  const type = await getCurrentUserType();
  if (type !== 'root') {
    warnHandler();
    return 0;
  }
  usersAllList.value = [];
  if (config_user.value) {
    const config = {
      method: 'GET',
      route: '/search/username',
      params: { username },
    };
    const res = await config_user.value.user_start(config);
    if (res.status) {
      usersAllList.value.push(res.data);
    } else {
      warnHandler_isExistUser();
      usersAllList.value = [];
    }
  }
}

onMounted(async () => {});

// util---------------------------------------------------------------------------
// --本地存储
const removeLocalStorageItemsByPrefix = (prefix) => {
  // 从后往前遍历以避免索引问题💥
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
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
    if (key.startsWith(prefix)) {
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

<style lang="scss" scoped>
.root-request {
  width: 600px;
  margin: 0 auto;
  margin-top: 50px;
  .warning {
    width: 30%;
    position: fixed;
    z-index: 1;
  }
  .success {
    width: 30%;
    position: fixed;
    z-index: 1;
  }
  .search {
  }
  .filter {
  }
}
</style>
