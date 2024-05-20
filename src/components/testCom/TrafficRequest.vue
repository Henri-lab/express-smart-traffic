<template>
  <div class="traffic">
    <form class="event">
      <v-text-field
        v-model="state.eventDriver"
        :counter="20"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="Name"
        required
        @blur="v$.name.$touch"
        @input="v$.name.$touch"
      ></v-text-field>
      <div class="traffic">{{ currentTime }}</div>
      <v-text-field
        v-model="state.eventTime"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="事件时间"
        :items="eventTime"
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

const currentTime = ref(new Date());
const initialState = {
  eventDriver: '',
  eventTime: '',
  select_level: null,
  select_type: null,
  checkbox: null,
};

const state = reactive({
  ...initialState,
});

const eventLevel = ['一般事故', '重大事故', '特大事故'];
const eventType = ['碰撞', '刮擦', '碾压', ' 其他'];
const eventTime = [`${currentTime.value}`];

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
const formattedTime = computed(() => {
  const hours = String(currentTime.value.getHours()).padStart(2, '0');
  const minutes = String(currentTime.value.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.value.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});

// Optionally, you can update the time every second
onMounted(() => {
  setInterval(updateTime, 1000);
});
</script>

<style lang="scss" scoped></style>
