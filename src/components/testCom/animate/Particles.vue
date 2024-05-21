<template>
  <div id="app">
    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      url="http://foo.bar/particles.json"
    />

    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="defaultOptions"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container);
};
const starOptions = {
  autoPlay: true,
  background: {
    color: {
      value: '#000000',
    },
  },
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: '#fff',
    },
    move: {
      direction: 'bottom',
      enable: true,
      speed: 5,
    },
    number: {
      value: 200,
    },
    shape: {
      type: 'star',
      options: {
        polygon: {
          sides: 5, // 仅在 type 为 polygon 时生效
        },
        star: {
          sides: 5, // 仅在 type 为 star 时生效
        },
        image: {
          src:"@/img/snow.png",
          width: 100,
          height: 100,
        },
        character: {
          value: 'A', // 仅在 type 为 character 时生效
          font: 'Verdana',
          style: '',
          weight: '400',
        },
      },
    },
    size: {
      value: 2,
    },
  },
  emitters: {
    position: {
      x: -5,
      y: 55,
    },
    rate: {
      quantity: 1,
      delay: 7,
    },
    shape: {
      type: 'square',
    },
    particles: {
      shape: {
        type: 'images',
        options: {
          images: {
            src: 'https://particles.js.org/images/cyan_amongus.png',
            width: 500,
            height: 634,
          },
        },
      },
      size: {
        value: 40,
      },
      move: {
        speed: 10,
        outModes: {
          default: 'none',
          right: 'destroy',
        },
        straight: true,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 10,
          sync: true,
        },
      },
    },
  },
};
const defaultOptions = {
  background: {
    color: {
      value: '#006400',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
onMounted(() => {
  particlesLoaded();
});
</script>

<style lang="scss" scoped></style>
