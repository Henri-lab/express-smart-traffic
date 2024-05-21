<template>
  <div class="traffic">
    <!-- 粒子特效 -->
    <!-- 问候特效 -->
    <div class="greet"></div>
    <!-- 入口导航 -->
    <div class="navi"></div>
    <!-- 事件表单 -->
    <form
      v-if="isEvent"
      ref="draggableForm"
      class="event draggable-field"
      style="
        background-color: whitesmoke;
        opacity: 80%;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 10px 10px 10px black;
        position: absolute;
      "
      :draggable="true"
      @mousedown="onDragStart"
    >
      <v-text-field
        v-model="state.eventDriver"
        :counter="20"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="Name"
        required
        @blur="v$.name.$touch"
        @input="v$.name.$touch"
      ></v-text-field>

      <v-text-field
        v-model="state.eventCar"
        :counter="12"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="车牌号"
        required
        @blur="v$.name.$touch"
        @input="v$.name.$touch"
      ></v-text-field>

      <div class="event-time">{{ currentTime }}</div>
      <v-text-field
        v-model="state.eventTime"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="事件时间"
        :items="eventTime"
        required
      ></v-text-field>

      <v-text-field
        v-model="state.eventLocation"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="事件地点"
        required
      ></v-text-field>

      <v-select
        v-model="state.select_level"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        :items="eventLevel"
        label="事件等级"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-select
        v-model="state.select_type"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        :items="eventType"
        label="事件类型"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-select
        v-model="state.select_status"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        :items="eventStatus"
        label="处理状态"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-checkbox
        v-model="state.checkbox"
        :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
        label="您确定提交此次事件吗?"
        required
        @blur="v$.checkbox.$touch"
        @change="v$.checkbox.$touch"
      ></v-checkbox>

      <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
    <!-- 公告表单 -->
    <form
      v-if="isAnnouncement"
      ref="draggableForm_announcement"
      class="event draggable-field"
      style="
        background-color: whitesmoke;
        opacity: 80%;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 10px 10px 10px black;
        position: absolute;
      "
      :draggable="true"
      @mousedown="onDragStart"
    >
      <v-text-field
        v-model="state.eventDriver"
        :counter="20"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="Name"
        required
        @blur="v$.name.$touch"
        @input="v$.name.$touch"
      ></v-text-field>

      <v-text-field
        v-model="state.eventCar"
        :counter="12"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="车牌号"
        required
        @blur="v$.name.$touch"
        @input="v$.name.$touch"
      ></v-text-field>

      <div class="event-time">{{ currentTime }}</div>
      <v-text-field
        v-model="state.eventTime"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="事件时间"
        :items="eventTime"
        required
      ></v-text-field>

      <v-text-field
        v-model="state.eventLocation"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="事件地点"
        required
      ></v-text-field>

      <v-select
        v-model="state.select_level"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        :items="eventLevel"
        label="事件等级"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-select
        v-model="state.select_type"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        :items="eventType"
        label="事件类型"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-select
        v-model="state.select_status"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        :items="eventStatus"
        label="处理状态"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-checkbox
        v-model="state.checkbox"
        :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
        label="您确定提交此次事件吗?"
        required
        @blur="v$.checkbox.$touch"
        @change="v$.checkbox.$touch"
      ></v-checkbox>

      <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
    
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import draggable from 'vuedraggable';
import Typed from 'typed.js';

const currentTime = ref(new Date());
const initialState = {
  eventDriver: '',
  eventCar: '',
  eventLocation: '',
  eventTime: '',
  select_level: null,
  select_type: null,
  select_status: null,
  checkbox: null,
};

const state = reactive({
  ...initialState,
});

const eventLevel = ['一般事故', '重大事故', '特大事故'];
const eventType = ['碰撞', '刮擦', '碾压', ' 其他'];
const eventTime = [`${currentTime.value}`];
const eventStatus = ['未处理', '处理中', '已处理'];

const rules = {
  name: { required },
  email: { required, email },
  select: { required },
  items: { required },
  checkbox: { required },
};

const v$ = useVuelidate(rules, state);

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}

const updateTime = () => {
  currentTime.value = new Date();
};
// Optionally, you can update the time every second
onMounted(() => {
  setInterval(updateTime, 1000);
});
onMounted(() => {
  var typed = new Typed('.greet', {
    strings: [
      '智慧交通，融贯古今',
      '我们在数据中看见了未来',
      '在算法中编织着希望',
      '每一条道路',
      '每一盏信号灯',
      '都在诉说着繁华与安全的故事',
      '在忙碌的街道上',
      '你是守护者',
      '指引着流动的车流',
      '如同指挥家掌控着交响乐的节奏',
      '每一个选择',
      '每一次点击',
      '都是为了那一天',
      '车辆顺畅，行人无恙',
      '让我们一起',
      '用科技绘制城市的未来',
      '用智慧点亮每一个平凡的日子',
      '光谷的每一寸土地',
      '都因你的努力而更加璀璨',
      '感谢你',
      '亲爱的交通管理人员',
      '让我们的城市',
      '在你的守护下',
      '变得更加美好',
      '愿你每天都能看见',
      '车流如诗',
      '灯火如歌',
      '在你的指引下',
      '城市的脉动',
      '绽放出最美的篇章',
      '亲爱的交通管理人员！',
      '欢迎回到光谷智慧交通',
      '请选择您的即将发布的内容类型',
    ],
    typeSpeed: 100,
    loop: true,
  });
});

const isEvent = ref(true);
const isAnnouncement = ref(false);
// 🚨
const draggableForm = ref(null);
const draggableForm_announcement = ref(null);
const dragOffsetX = ref(0);
const dragOffsetY = ref(0);
const dragOffsetX_announcement = ref(0);
const dragOffsetY_announcement = ref(0);
const dragging = ref(false);
function onDragStart(event) {
  const form = draggableForm.value;
  // const rect = form.getBoundingClientRect();
  // dragOffsetX.value = event.clientX - rect.left;
  // dragOffsetY.value = event.clientY - rect.top;
  dragOffsetX.value = event.clientX;
  dragOffsetY.value = event.clientY;
  dragOffsetX_announcement.value = event.clientX;
  dragOffsetY_announcement.value = event.clientY;
  dragging.value = true;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', onDragEnd);
}
function onDrag(event) {
  if (!dragging.value) return;
  const form = draggableForm.value;
  const form_announce = draggableForm_announcement;
  const x = event.clientX - dragOffsetX.value;
  const y = event.clientY - dragOffsetY.value;
  const x_annoucement = event.clientX - dragOffsetX_announcement.value;
  const y_annoucement = event.clientY - dragOffsetY_announcement.value;
  form.style.left = `${x}px`;
  form.style.top = `${y}px`;
  form_announce.style.left = `${x_annoucement}px`;
  form_announce.style.top = `${y_annoucement}px`;
}
function onDragEnd() {
  dragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', onDragEnd);
}

//


</script>

<style lang="scss" scoped>
.traffic {
  background-color: transparent;
  position: relative;
  .navi {
    top: 0%;
    left: 50%;
    position: absolute;
    .speed-dial {
      width: 500px;
      height: 500px;
      :deep(.fab) {
        width: 100px;
        height: 100px;
        font-size: 24px;
      }
    }
  }
  .event {
    width: 50%;
    .event-time {
    }
  }
}

.draggable-field {
  cursor: move;
}

.greet {
  color: wheat;
  font-size: 25px;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  text-align: center;
}


</style>
