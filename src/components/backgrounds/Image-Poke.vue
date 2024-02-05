<script setup lang="ts">
import {ref, toRefs} from "vue";

const props = defineProps({
  path: String,
  width: String,
  height: String,
  pop: Boolean,
  turnover: Boolean
})
const {path, width, height, pop} = toRefs(props)
const img = ref<HTMLImageElement>()
const pop_img = ref<HTMLImageElement>()
const targit = ref<HTMLElement>()
const card0 = ref<HTMLElement>()
const card1 = ref<HTMLElement>()
const yRange = [-20, 20];
const xRange = [-20, 20];

function getRoateDeg(range: number[], value: number, length: number) {
  return value / length * (range[1] - range[0]) + range[0];
}

function transtlate(e: any, item: any) {
  const {offsetX, offsetY} = e;
  const {offsetWidth, offsetHeight} = item;
  const rx = getRoateDeg(xRange, offsetY, offsetWidth);
  const ry = -getRoateDeg(yRange, offsetX, offsetWidth);
  item.style.setProperty('--rx', `${rx}deg`)
  item.style.setProperty('--ry', `${ry}deg`)
}

function recover(item: any) {
  item.style.setProperty('--rx', `0deg`)
  item.style.setProperty('--ry', `0deg`)
}

function openImg() {
  if (pop) {
    if (!pop.value) return
    if (pop_img.value && img.value) {
      pop_img.value.src = img.value.src;
      if (targit.value) {
        if (targit.value.style.display == "none" || targit.value.style.display == "") {
          targit.value.style.display = "flex";
          targit.value.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        } else {
          targit.value.style.display = "none";
        }
      }
    }
  }

}
</script>

<template>
  <div class="main">
    <!-- 需要点击放大的图片 -->
    <div class="pop-box">
      <div ref="card0"
           @mousemove="transtlate($event, card0)"
           @mouseleave="recover(card0)"
           :class="[turnover?'card-tran':'', 'card']"
           :style="{width:width,height:height} ">
        <div id="flash"></div>
        <img ref="img" :src="props.path" @click="openImg"/>
      </div>
    </div>
    <!-- 放大之后的图片 -->
    <div ref="targit" id="pop-box" @click="openImg">
      <div ref="card1" class="card card-tran" @mousemove="transtlate($event, card1)">
        <div id="flash"></div>
        <img ref="pop_img" id="pop-img" src="">
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 放大图片的盒子样式 */
:root {
  --rx: 0;
  --ry: 0;
}

.pop-box {
  width: auto;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: white;
}

#pop-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: none;
  z-index: 10;
  background-color: white;
}

.card-tran {
  transform: perspective(500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: 0.3s;
}
.card{
  overflow: hidden;
  position: relative;
  width: 20vw;
  height: 50vh;
  border-radius: 10px;
}
.card img {
  height: 100%;
  width: 100%;
  border-radius: inherit;
}

.card:hover {
  box-shadow: -3px -3px 10px #54a29e, 3px 3px 10px #a79d66;
}

#flash {
  position: absolute;
  width: 100px;
  height: 100%;
  left: -145px;
  top: 0;
  background-image: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
  transform: skewX(-30deg);
  animation: flash 1.5s linear infinite;
}

@keyframes flash {
  0% {
  }
  50% {
    left: 150px;
  }
  100% {
    left: 300px;
  }

}

.main {
  display: inline-block;
}
</style>
