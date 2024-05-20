<template>
  <div class="home" id="cover" ref="myCover">
    <div id="map" ref="myMap"></div>
    <div id="element"></div>
    <v-item-group multiple>
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
                  <!--  前面 -->
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
    </v-item-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Typed from 'typed.js';
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
//
const flippedCards = ref({});

const flipCard = (n) => {
  flippedCards.value[n] = !flippedCards.value[n];
};

onMounted(() => {
  var typed = new Typed('#element', {
    strings: ['hello！', '欢迎来到光谷智慧交通', '请选择您的用户类型'],
    typeSpeed: 50,
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
.type-choose {
  width: 80%;
  margin-left: 300px;
  margin-top: 300px;
}
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
}
#element {
  position: absolute;
  top: 5%;
  left: 25%;
  font-size: 100px;
  color: yellow;
  font-weight: bold;
}
</style>
