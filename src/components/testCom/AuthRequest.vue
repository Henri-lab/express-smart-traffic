<template>
  <div class="auth-request">
    <!-- api交互 -->
    <axios-config ref="config"></axios-config>

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
    <transition enter-active-class="animate__animated animate__flip">
      <div class="login-page animate__animated" v-if="isloginPage">
        <!-- 登录检测-->
        <div class="alert" v-show="isAlert">
          <v-alert
            class="v-alert"
            width="500"
            icon="mdi-alert"
            :title="alertTitle"
            :text="alertText"
            type="error"
            @click="alertHandle"
          ></v-alert>
        </div>
        <!-- 登陆表单 -->
        <v-card
          class="mx-auto pa-12 pb-8 card-login"
          max-width="500"
          :hover="true"
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

            <span class="text-caption text-decoration-none text-blue">
              {{ pwNote }}</span
            >
          </div>

          <v-text-field
            v-model="login_password"
            class="password-input"
            :class="{ borderRed: loginInputBoderColor === true }"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <!-- 验证码 -->
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
              <v-otp-input
                v-model="otp"
                type="text"
                variant="solo"
              ></v-otp-input>
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
          <!-- 登录按键 -->
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
          <!-- 立即注册 -->
          <v-card-text class="text-center">
            <span class="signup-now" style="color: blue" @click="jumpToRegister"
              >Sign up now</span
            >
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-card-text>
        </v-card>

        <!-- 登陆成功 -->
        <div class="login-done" v-show="isLogindoneShow">
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

            <h2 class="text-h5 mb-6">成功登录账户</h2>

            <v-divider class="mb-4"></v-divider>

            <div class="text-end">
              <v-btn
                class="text-none"
                color="success"
                variant="flat"
                width="90"
                rounded
                @click="isLogindoneShow = !isLogindoneShow"
                v-ripple
              >
                Done
              </v-btn>
            </div>
          </v-sheet>
        </div>
      </div>
    </transition>

    <!-- 注册页面 -->
    <transition enter-active-class="animate__animated animate__flip">
      <div class="regist-page animate__animated" v-if="isRegisterPage">
        <!-- 注册检测-->
        <div class="alert" v-show="isAlert">
          <v-alert
            class="v-alert"
            width="500"
            icon="mdi-alert"
            :title="alertTitle"
            :text="alertText"
            type="error"
            @click="alertHandle"
          ></v-alert>
        </div>
        <!-- 加载条 -->
        <v-progress-circular
          class="loading"
          color="primary "
          indeterminate
          size="50"
          v-show="isLoading"
        ></v-progress-circular>
        <!-- 注册表单 -->
        <v-card
          class="regist-form"
          width="500"
          height="450"
          title="用户注册"
          v-show="isRegisterForm"
          :hover="true"
        >
          <v-container>
            <v-text-field
              v-model="regist_username"
              :rules="rulesUName"
              color="primary"
              label="用户名"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="registPW"
              :rules="rulesPW"
              color="primary"
              label="密码"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="registPW_confirm"
              :rules="rulesPW"
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
    </transition>

    <!-- 登出页面 -->
    <transition
      enter-active-class="animate__animated animate__zoomInDown"
      leave-active-class="animate__animated animate__zoomOutDown"
    >
      <div class="logout-page" v-if="isLogoutPage">
        <v-parallax
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          class="parallex"
        >
          <div
            class="d-flex flex-column fill-height justify-center align-center text-white"
          >
            <h1 class="text-h4 font-weight-thin mb-4">您已经成功登出</h1>
            <h4 class="subheading">感谢您的使用，祝您生活愉快</h4>
          </div>
        </v-parallax>
      </div>
    </transition>

    <!-- 其他组件 -->
    <!-- 管理员 -->
    <transition
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
    >
      <root-request v-if="isRootPage"></root-request>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AxiosConfig from './AxiosConfig.vue';
import { v4 as uuidv4 } from 'uuid';
import { watch } from 'vue';
import 'animate.css';
import RootRequest from './RootRequest.vue';

// DATA
// 请求----------------------------------------------------------------
const config = ref(null);
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
const isLogindoneShow = ref(false);
const isRegisterForm = ref(false);
const isRegisterPage = ref(false);
const isLogoutPage = ref(false);
const isRootPage = ref(false);
const overlay = ref(false);
const terms = ref(false);
const pwNote = ref('');
const menuItems = [
  { icon: 'mdi-account-circle', title: '个人信息', value: 'me' },
  { icon: 'mdi-draw', title: '注册', value: 'register' },
  { icon: 'mdi-login', title: '登入', value: 'login' },
  { icon: 'mdi-logout', title: '登出', value: 'logout' },
  { icon: 'mdi-cog-outline', title: '设置', value: 'setting' },
  { icon: 'mdi-shield-account', title: '高级管理员', value: 'root' },
];
const isAlert = ref(false);
const alertTitle = ref('');
const alertText = ref('');
const isLoading = ref(false);
const loginInputBoderColor = ref(false);
const isLogoutPageCliked = ref(false);
const rulesPW = [
  (value) => !!value || 'Required.',
  (value) => (value || '').length <= 20 || 'Max 20 characters',
  (value) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(value) || 'Invalid password.';
  },
];
const rulesUName = [
  (value) => !!value || 'Required.',
  (value) => (value || '').length <= 20 || 'Max 20 characters',
  (value) => {
    const pattern = /^[^\u4E00-\u9FFF]*$/;
    return pattern.test(value) || 'Invalid username.';
  },
];

// METHOD---------------------------------------------------------------
// 登录
watch(
  () => login_password.value,
  (newValue) => {
    if (isValidPW(newValue) || !newValue) {
      loginInputBoderColor.value = false;
      pwNote.value = '';
    } else {
      loginInputBoderColor.value = true;
      pwNote.value = '密码格式不正确';
    }
  }
);
const loginHandle = async () => {
  const response = [];
  const route = '/login';
  const token = '';
  const data = ref({
    username: login_username.value,
    password: login_password.value,
  });
  if (config.value) {
    const res = await config.value.auth_start('post', data.value, route, token);
    if (res.status === 1) {
      response.push({ id: login_username.value, token: res.token });
      localStorageManager('set', 'Authorization-', response);
      isLogindoneShow.value = true;
    } else {
      alertHandle();
      isAlert.value = true;
      alertTitle.value = '登录失败';
      alertText.value = '请检查您的账户名称和密码';
    }
    // 路由跳转
  }
};

// 注册
function isValidPW(pw) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(pw);
}
async function registerHandle() {
  // 请求组件加载完成
  if (!config.value) {
    return;
  }
  // 前置验证
  if (!regist_username.value.length) {
    isAlert.value = true;
    alertTitle.value = '用户名不能为空';
    alertText.value =
      '本网站用户名不能超过20个字符且不能重复,建议使用邮箱作为用户名';

    return;
  }

  if (regist_username.value.length > 20) {
    isAlert.value = true;
    alertTitle.value = '用户名过长';
    alertText.value =
      '本网站用户名不能超过20个字符且不能重复,建议使用邮箱作为用户名';

    return;
  }
  if (registPW.value.length === 0) {
    isAlert.value = true;
    alertTitle.value = '请设置密码哦';
    alertText.value =
      '本网站密码至少8位，至少包含大写字母，小写字母，数字和特殊字符(@$!%*?&)';

    return;
  }
  if (registPW.value.length < 8) {
    isAlert.value = true;
    alertTitle.value = '密码过短';
    alertText.value =
      '本网站密码至少8位，至多20位，至少包含大写字母，小写字母，数字和特殊字符(@$!%*?&)';

    return;
  }

  if (registPW.value.length > 20) {
    isAlert.value = true;
    alertTitle.value = '密码过长';
    alertText.value =
      '本网站密码至少8位，至多20位，至少包含大写字母，小写字母，数字和特殊字符(@$!%*?&)';

    return;
  }
  if (registPW.value !== registPW_confirm.value) {
    isAlert.value = true;
    alertTitle.value = '两次输入的密码不一致';
    alertText.value = '请检测自己两次输入的密码是否相同，注意大小写';

    return;
  }

  if (!isValidPW(registPW.value)) {
    isAlert.value = true;
    alertTitle.value = '密码不符合要求';
    alertText.value =
      '本网站密码至少8位，至多20位，至少包含大写字母，小写字母，数字和特殊字符(@$!%*?&)';

    return;
  }

  if (!terms.value) {
    isAlert.value = true;
    alertTitle.value = '请勾选下方选项';
    alertText.value = '请您在勾选前仔细阅读我方产品的功能介绍';

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
  isLoading.value = true;
  await sleep(500); //模拟发送网络不佳的情况
  const res = await config.value.auth_start('post', data, route, token);
  await sleep(500); //模拟接受网络不佳的情况
  isLoading.value = false;
  if (res.status === 1) {
    isAlert.value = false;
    isRegisterdoneShow.value = true;
  } else {
    alertHandle();
    isAlert.value = true;
    alertTitle.value = '注册用户名称重复';
    setTrue([isRegisterForm]);
    setFalse([isRegisterdoneShow]);
  }
}

// 登出
async function logout() {
  const result = [];
  localStorageManager('get', 'Authorization-', result);
  if (result.length === 0) return;
  const token = result[0].token;
  if (!token) return;
  const encodeToken = encodeURIComponent(token);
  const res = await config.value.auth_start(
    'post',
    null,
    '/logout',
    encodeToken
  );
  if (res.status === 1) {
    localStorageManager('clear', 'Authorization-');
  }
}

//  验证 验证码
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

// 生成 验证码
function otpHandle() {
  if (login_username.value) {
    sheetColor.value = 'superface';
    isVertify.value = false;
    otp.value = '';
    vertifycode.value = Math.floor(Math.random() * (999999 - 100000 + 1)) + 0;
    alert('请输入弹出框中的数字：' + vertifycode.value);
  }
}

// 其他按钮页面跳转
function setTrue(arr) {
  arr.forEach((item) => {
    item.value = true;
  });
}
function setFalse(arr) {
  arr.forEach((item) => {
    item.value = false;
  });
}
function jumpToLogin() {
  setTrue([isloginPage]);
  setFalse([isRegisterForm, isRegisterdoneShow, isRegisterPage]);
}
function jumpToRegister() {
  setTrue([isRegisterPage, isRegisterForm]);
  setFalse([isloginPage, isRegisterdoneShow]);
}
// 导航栏按钮页面跳转
async function handleItemClick(item_value) {
  switch (item_value) {
    case 'login':
      setTrue([isloginPage]);
      setFalse([isRegisterPage, isLogoutPage, isRootPage]);
      isAlert.value = false;
      break;
    case 'register':
      setTrue([isRegisterPage, isRegisterForm]);
      setFalse([isloginPage, isRegisterdoneShow, isLogoutPage, isRootPage]);
      isAlert.value = false;
      break;
    case 'logout':
      setTrue([isLogoutPage]);
      setFalse([isloginPage, isRegisterPage, isRootPage]);
      isAlert.value = false;
      await logout();
      break;
    case 'root':
      setTrue([isRootPage]);
      setFalse([isloginPage, isRegisterPage, isLogoutPage]);
      isAlert.value = false;
      break;

    default:
      setFalse([isloginPage, isRegisterPage, isLogoutPage, isRootPage]);
      isAlert.value = false;
  }
}

// 样式设计
function alertHandle() {
  isAlert.value = false;
  alertText.value = '';
  alertTitle.value = '';
}

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

// --sleep
async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}
</script>

<style lang="scss" scoped>
.user {
  width: 800px;
  height: 800px;
  margin: 0 auto;
  position: relative;

  .login-page {
    top: -2%;
    left: 30%;
    position: absolute;
    .login-done {
      width: 80%;
      top: 20%;
      left: 10%;
      position: absolute;
      opacity: 0.7;
    }
    .title {
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      color: black;
      margin-bottom: 20px;
    }
    .card-login {
      margin-top: 20px;
      position: relative;
    }
    .card-vertify {
      width: 600px;
      left: 50%;
      top: 62%;
      transform: translateX(-50%);
      text-align: center;
      position: absolute;
    }
  }
  .logout-page {
    width: 1000px;
    height: 500px;
    position: absolute;
    .parallex {
      width: 100%;
      height: 100%;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
  }
  .regist-page {
    top: 0;
    left: 30%;
    position: absolute;
    .loading {
      z-index: 1;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    .regist-done {
      width: 80%;
      top: 10%;
      left: 10%;
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

.borderRed {
  color: red;
}
</style>
