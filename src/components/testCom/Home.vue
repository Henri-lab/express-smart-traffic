<template>
  <div class="home" id="cover" ref="myCover">
    <div id="map" ref="myMap"></div>
    <!-- 问候语 -->
    <div id="element"></div>
    <!-- 标题 -->
    <div class="bloc-logo">
      <canvas id="logo-canvas"></canvas>
      <span class="logo-mask">Smart Traffic</span>
    </div>
    <!-- 选择器 -->
    <v-container class="pa-4 text-center chooser">
      <v-row align="center" class="fill-height" justify="center">
        <template v-for="(item, i) in items" :key="i">
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                :class="{ 'on-hover': isHovering }"
                :elevation="isHovering ? 12 : 2"
                v-bind="props"
              >
                <v-img :src="item.img" height="225px" cover>
                  <v-card-title class="text-h6 text-white d-flex flex-column">
                    <p class="mt-4">{{ item.title }}</p>

                    <div>
                      <p class="ma-0 text-body-1 font-weight-bold">
                        {{ item.text }}
                      </p>
                    </div>
                  </v-card-title>
                  <div class="align-self-center">
                    <v-btn
                      :class="{ 'show-btns': isHovering }"
                      :color="transparent"
                      :icon="item.icon"
                      size="x-large"
                      variant="text"
                    ></v-btn>
                  </div>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Typed from 'typed.js';
import Granim from 'granim';
const myCover = ref(null);
const myMap = ref(null);
// 背景创建
onMounted(() => {
  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 50, 100);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  myMap.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼效果

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 50, 50).normalize();
  scene.add(light);

  // 处理窗口调整大小
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 创建星空
  function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  }

  createStars();

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});

onMounted(() => {
  var typed = new Typed('#element', {
    strings: [
      'hello！',
      '欢迎来到光谷智慧交通',
      '请选择您的用户类型',
      '智慧交通系统让城市更加便捷',
      '您可以通过我们的平台发布交通信息',
      '实时监控交通状况，提供解决方案',
      '感谢您的参与与支持',
      '请从以下选项中选择您的用户类型',
      '让我们共同建设一个更美好的未来',
      '选择您的用户类型开始体验吧',
      '光谷智慧交通，为您提供最优服务',
      '无论您是司机、行人还是管理者',
      '我们的系统都为您准备了专属功能',
      '司机朋友，请选择“司机”',
      '行人朋友，请选择“行人”',
      '管理人员，请选择“管理者”',
      '如果您有任何疑问，请联系我们的客服',
      '愿您在光谷智慧交通平台上有愉快的体验',
      '让我们一起努力，创造安全、畅通的交通环境',
      '再次感谢您的加入，祝您一切顺利',
    ],
    typeSpeed: 50,
    loop: true,
  });
});

//
const items = [
  {
    title: '管理员',
    text: `欢迎加入我们的工作室`,
    img: 'https://cdn.vuetifyjs.com/docs/images/cards/hands.jpg',
    icon: 'mdi-account-cowboy-hat-outline',
  },
  {
    title: '交通管理员',
    text: '感谢您的辛苦工作',
    img: 'https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg',
    icon: 'mdi-rocket-outline',
  },
  {
    title: '普通用户',
    text: '尝试下我们的新产品吧',
    img: 'https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg',
    icon: 'mdi-tooltip-account',
  },
];
const transparent = 'rgba(255, 255, 255, 0)';
onMounted(() => {
  var granimInstance = new Granim({
    element: '#logo-canvas',
    direction: 'left-right',
    states: {
      'default-state': {
        gradients: [
          ['#EB3349', '#F45C43'],
          ['#FF8008', '#FFC837'],
          ['#4CB8C4', '#3CD3AD'],
          ['#24C6DC', '#514A9D'],
          ['#FF512F', '#DD2476'],
          ['#DA22FF', '#9733EE'],
        ],
        transitionSpeed: 3000,
      },
    },
  });
});
</script>

<style lang="scss" scoped>
#cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
}

#element {
  position: absolute;
  top: 5%;
  left: 25%;
  font-size: 100px;
  color: yellow;
  font-weight: bold;
}

.chooser {
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  position: absolute;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

#element {
  width: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  text-align: center !important;
}

.bloc-logo {
  position: relative;
  width: 500x;
  height: 75px;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  position: absolute;
}

.bloc-logo canvas,
.bloc-logo .logo-mask {
  width: 100%;
  height: 100%;
  font-size: 20px;
}

.bloc-logo .logo-mask {
  position: absolute;
  top: 0;
  left: 0;
  text-indent: 100px;
}
</style>

<!-- <v-item-group multiple>
      <v-container class="type-choose">
        <v-row>
          <v-col v-for="n in 3" :key="n" cols="12" md="4">
            <div class="flip-card" @click="flipCard(n)">
              <div :class="['flip-card-inner', { flipped: flippedCards[n] }]">
                <v-item v-slot="{ isSelected, toggle }">
                  <v-card
                    :color="isSelected ? 'yellow' : ''"
                    class="d-flex align-center flip-card-back"
                    width="300"
                    height="400"
                    dark
                    @click.stop="toggle"
                  >
                    <v-scroll-y-transition>
                      <div class="text-h3 flex-grow-1 text-center">
                        {{ isSelected ? 'Selected' : 'Click Me!' }}
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                    前面
                  <v-card
                    :color="isSelected ? 'yellow' : 'orange'"
                    class="d-flex align-center flip-card-front"
                    width="300"
                    height="400"
                    dark
                    @click.stop="toggle"
                  >
                    <v-scroll-y-transition>
                      <div class="text-h3 flex-grow-1 text-center">
                        {{ isSelected ? 'Selected' : '!' }}
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group> -->

<!-- //
const flippedCards = ref({});

const flipCard = (n) => {
  flippedCards.value[n] = !flippedCards.value[n];
}; -->

<!-- 
.type-choose {
  width: 80%;
  margin-left: 300px;
  margin-top: 300px;
} -->
<!-- 
.flip-card {
  perspective: 1000px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-card-front {
  background-color: #fff;
  color: black;
}
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
.flipped {
  transform: rotateY(180deg);
} -->
