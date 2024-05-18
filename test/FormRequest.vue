<template>
  <div class="user">
    <!-- api交互 -->
    <axios-config ref="request"></axios-config>

    <!-- 侧边导航栏 -->
    <v-layout class="navi-drawer">
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item title="用户导航"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="item in menuItems"
            :key="item.value"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.value"
            @click="handleItemClick(item.value)"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>

    <!-- 登录页面 -->
    <!-- <img class="title-img" src="@/img/PornHubLogo.png" foolishIn />zx -->
    <div class="login-page" v-if="isloginPage">
      <v-card
        class="mx-auto pa-12 pb-8 card-login"
        elevation="8"
        max-width="1000"
        rounded="lg"
      >
        <div class="title">用户登录</div>
        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          用户名
        </div>

        <v-text-field
          v-model="login_username"
          class="username-input"
          density="compact"
          placeholder="username"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a
          >
        </div>

        <v-text-field
          v-model="login_password"
          class="password-input"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card
          class="mb-12 card-vertify"
          color="surface-variant"
          variant="tonal"
        >
          <h3 class="text-h6 mb-4">确认您是真人</h3>
          <div class="text-body-2">
            We sent a verification code<br />
            Please input the code below.
          </div>

          <v-sheet :color="sheetColor">
            <v-otp-input v-model="otp" type="text" variant="solo"></v-otp-input>
          </v-sheet>

          <v-btn
            class="my-4"
            color="purple"
            height="40"
            text="Verify"
            variant="flat"
            width="70%"
            @click="verifyHandle"
            v-ripple
          ></v-btn>

          <div class="text-caption">
            Didn't receive the code?
            <a href="#" @click.prevent="otpHandle">Resend</a>
          </div>
        </v-card>

        <v-btn
          v-show="loginIn_Show"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="loginHandle"
        >
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>

    <!-- 注册页面 -->
    <div class="regist-page" v-if="isRegisterPage">
      <!-- 注册表单 -->
      <v-card
        class="mx-auto regist-form"
        max-width="344"
        title="用户注册"
        v-show="isRegisterForm"
      >
        <v-container>
          <v-text-field
            v-model="regist_username"
            color="primary"
            label="用户名"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="registPW"
            color="primary"
            label="密码"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="registPW_confirm"
            color="primary"
            label="确认密码"
            variant="underlined"
          ></v-text-field>

          <span class="info" style="color: blue" @click="overlay = !overlay"
            >产品简介</span
          >
          <v-checkbox
            v-model="terms"
            color="secondary"
            label="已经阅读产品介绍"
            @click="terms = !terms"
          ></v-checkbox>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" @click="registerHandle"
            >注册<v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- 注册成功提示 -->
      <div class="regist-done" v-show="isRegisterdoneShow">
        <v-sheet
          class="pa-4 text-center mx-auto"
          elevation="12"
          max-width="600"
          rounded="lg"
          width="100%"
        >
          <v-icon
            class="mb-5"
            color="success"
            icon="mdi-check-circle"
            size="112"
          ></v-icon>

          <h2 class="text-h5 mb-6">成功创建账户</h2>

          <p class="mb-4 text-medium-emphasis text-body-2">
            如果想详细了解产品功能
            <a class="text-decoration-none text-info" href="#">查看</a>
          </p>

          <v-divider class="mb-4"></v-divider>

          <div class="text-end">
            <v-btn
              class="text-none"
              color="success"
              variant="flat"
              width="90"
              rounded
              @click="jumpToLogin"
              v-ripple
            >
              Done
            </v-btn>
          </div>
        </v-sheet>
      </div>
      <!-- 注册须知 -->
      <v-overlay
        v-model="overlay"
        class="align-center justify-center"
        contained
      >
        <v-overlay
          v-model="overlay"
          class="align-center justify-center d-flex"
          absolute
        >
        </v-overlay>
        <div class="regist-note">
          <v-sheet
            border="md"
            class="pa-6 text-white"
            color="#141518"
            max-height="500"
            max-width="400"
          >
            <h4 class="text-h5 font-weight-bold mb-4">光谷智慧交通</h4>
            <p class="mb-8">
              随着我国经济社会的不断发展与城市化人口逐渐增多，居民经济条件越来越好，大众的出行使用车辆的数目也在急剧增加。伴随着交通道路上增加的车辆，早高峰、晚高峰的拥堵时间不断延长，道路的事故发生率也在不断增长，怎样让民众合理的出行对政府部门提出了更高的要求。基于以上的要求，我们开发一款WebGIS的智慧交通系统，使得大众能够合理规划出行，政府交通部门能够快速处理事故，缓解交通出行的拥堵。
              <br />
              <br />
              请关注项目仓库地址
              <a
                class="text-red-accent-2"
                href=" https://gitee.com/fahey/smart-city.git"
              >
                https://gitee.com/fahey/smart-city.git</a
              >
              获得及时的技术支持和产品更新
            </p>
            <v-btn
              class="text-none text-black mb-4"
              color="red-accent-2"
              size="x-large"
              variant="flat"
              block
              v-ripple
              @click="overlay = false"
            >
              了解
            </v-btn>
          </v-sheet>
        </div>
      </v-overlay>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AxiosConfig from './AxiosConfig.vue';
import { v4 as uuidv4 } from 'uuid';

// 请求----------------------------------------------------------------
const request = ref(null);
const login_username = ref('');
const login_password = ref('');
const regist_username = ref('');
const registPW = ref('');
const registPW_confirm = ref('');
// vuetify-------------------------------------------------------------
const visible = ref(false);
const otp = ref('');
const vertifycode = ref(0);
const isVertify = ref(false);
const loginIn_Show = ref(false);
const sheetColor = ref('superface');
const isloginPage = ref(false);
const isRegisterdoneShow = ref(false);
const isRegisterForm = ref(false);
const isRegisterPage = ref(false);
const overlay = ref(false);
const terms = ref(false);
const menuItems = [
  { icon: 'mdi-account-circle', title: '个人信息', value: 'me' },
  { icon: 'mdi-draw', title: '注册', value: 'register' },
  { icon: 'mdi-login', title: '登入', value: 'login' },
  { icon: 'mdi-logout', title: '登出', value: 'logout' },
  { icon: 'mdi-cog-outline', title: '设置', value: 'setting' },
];

// 登录
const response = [];
const loginHandle = async () => {
  const route = '/login';
  const token = '';
  const data = ref({
    username: login_username.value,
    password: login_password.value,
  });
  if (request.value) {
    const res = await request.value.start('post', data.value, route, token);
    console.log(res, 'res');
    if (res.status === 1) {
      response.push(res);
      localStorageManager('set', 'Authorization-', response);
    }
    // 路由跳转
  }
};

// 注册
async function registerHandle() {
  // 请求组件加载完成
  if (!request.value) {
    return;
  }
  // 前置验证
  if (!regist_username.value.length) {
    alert('用户名不能为空');
    return;
  }

  if (regist_username.value.length > 20) {
    alert('用户名过长');
    return;
  }
  if (registPW.value.length === 0) {
    alert('请设置密码');
    return;
  }
  if (registPW.value.length < 8) {
    alert('密码过短');
    return;
  }

  if (registPW.value.length > 20) {
    alert('密码过长');
    return;
  }
  if (registPW.value !== registPW_confirm.value) {
    alert('两次输入的密码不一致');
    return;
  }

  if (!isValidPW(registPW.value)) {
    alert(
      '密码不符合要求, 至少八个字符，包含大写字母、小写字母、数字和特殊字符'
    );
    return;
  }

  if (!terms.value) {
    alert('请勾选用户协议');
    return;
  }

  // 验证通过-请求注册
  const data = {
    id: uuidv4(),
    username: regist_username.value,
    password: registPW.value,
    type: 'common',
    isOnline: false,
  };
  const route = '/register';
  const token = '';

  const res = await request.value.start('post', data, route, token);
  if (res.status === 1) isRegisterdoneShow.value = true;
  else if (res.err === 'username has existed!') {
    alert(`抱歉,您的注册失败了:该用户已经存在`);
    isRegisterForm.value = true;
    isRegisterdoneShow.value = false;
  }
}

// vertify 验证 验证码
function verifyHandle() {
  if (login_username.value) {
    if (vertifycode.value === 0) alert('请先申请验证码');
    else if (otp.value.length === 6) {
      if (Number(otp.value) === Number(vertifycode.value)) {
        isVertify.value = true;
        loginIn_Show.value = true;
        vertifycode.value = 0;
      } else {
        isVertify.value = false;
        sheetColor.value = 'error';
        alert('请重新输入验证码');
      }
    }
    if (otp.value.length !== 6) sheetColor.value = 'error';
  }
}
// resend：生成 验证码
function otpHandle() {
  if (login_username.value) {
    sheetColor.value = 'superface';
    isVertify.value = false;
    otp.value = '';
    vertifycode.value = Math.floor(Math.random() * (999999 - 100000 + 1)) + 0;
    alert('请输入弹出框中的数字：' + vertifycode.value);
  }
}

function jumpToLogin() {
  isloginPage.value = true;
  isRegisterdoneShow.value = false;
  isRegisterForm.value = false;
  isRegisterPage.value = false;
}

function handleItemClick(item_value) {
  switch (item_value) {
    case 'login':
      isloginPage.value = true;
      isRegisterForm.value = false;
      break;
    case 'register':
      isloginPage.value = false;
      isRegisterPage.value = true;
      isRegisterForm.value = true;
      break;
    case 'logout':
      isloginPage.value = false;
      isRegisterPage.value = false;
      isRegisterForm.value = false;
      logout();

    default:
      isloginPage.value = false;
      isRegisterdoneShow.value = false;
  }
}

async function logout() {
  const result = [];
  localStorageManager('get', 'Authorization-', result);
  const token = result[0].token;
  console.log(token, 'token');
  const encodeToken = encodeURIComponent(token);
  console.log(encodeToken, 'encodeToken');
  const res = request.value.start('post', null, '/logout', encodeToken);
  console.log(res, 'res');
}
function isValidPW(pw) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(pw);
}

// util---------------------------------------------------------------------------

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
.user {
  width: 800px;
  height: 800px;
  margin: 0 auto;
  position: relative;
  .title-img {
    width: 40%;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
  }

  .login-page {
    width: 700px;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    position: absolute;
    .title {
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      color: black;
      margin-bottom: 20px;
    }
    .card-login {
      margin-top: 20px;
    }
    .card-vertify {
      width: 600px;
      left: 50%;
      top: 62%;
      transform: translateX(-50%);
      text-align: center;
    }
  }
  .regist-page {
    width: 500px;
    height: 500px;
    position: absolute;

    .regist-done {
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
      top: 20%;
      position: absolute;
      opacity: 0.7;
    }
    .regist-note-overlay {
      .regist-note {
        position: absolute;
        top: -200px;
      }
    }
  }
}
.test {
  display: flex;
  justify-content: space-around;
  background-color: rgb(179, 87, 165);
  top: 0;
  left: 250px;
  .start {
    width: 100px;
    background-color: antiquewhite;
  }
  .start:hover {
    background-color: aqua;
  }
}
</style>
