<template>
  <div class="star_content" ref="star_content">
    <canvas id="star_canvas" ref="star_canvas" style="position: absolute;z-index: 0"></canvas>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {Move, Draw, DrawLine, generateStar} from "@/components/backgrounds";
import type {Star} from "@/components/backgrounds";

const star_content = ref<HTMLDivElement>();
const star_canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;
const screenWidth = ref()
const screenHeight = ref()

let timer: any;
let starArr: Star[];
let mouse_star: Star;
const initStar = () => {
  ctx = star_canvas.value!.getContext("2d") as CanvasRenderingContext2D;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  starArr = [];
  for (let i = 0; i < screenWidth.value / 10; i++) {
    let star = generateStar(screenWidth.value, screenHeight.value);
    starArr.push(star);
  }

  // 鼠标star
  mouse_star = generateStar(screenWidth.value, screenHeight.value);
  mouse_star.speedX = 0;
  mouse_star.speedY = 0;
  // 鼠标star跟随移动
  star_canvas.value!.onmousemove = e => {
    mouse_star.x = e.offsetX;
    mouse_star.y = e.offsetY;
  };

  // 点击添加star
  star_canvas.value!.onclick = e => {
    for (let i = 0; i < 2; i++) {
      let star = generateStar(screenWidth.value, screenHeight.value);
      star.x = e.offsetX;
      star.y = e.offsetY;
      starArr.push(star);
    }
    starArr.pop()
  };
};
const initCanvas = () => {
  star_canvas.value!.width = screenWidth.value;
  star_canvas.value!.height = screenHeight.value;
  ctx = star_canvas.value?.getContext("2d") as CanvasRenderingContext2D;
  initStar();
  PauseTimer()
  startTimer()
};
const startTimer = () => {
  timer = setInterval(() => {
    ctx.clearRect(0, 0, (screenWidth.value), (screenHeight.value));
    // 鼠标star移动
    Draw(ctx, mouse_star);
    // startTimer移动
    starArr.forEach((star: Star) => {
      Draw(ctx, star);
      Move(star, screenWidth.value, screenHeight.value);
    });

    // 比较star和所有其他star的距离，小于50连线
    starArr.forEach((star: Star, index: number) => {
      for (let i = index + 1; i < starArr.length; i++) {
        if (Math.abs(star.x - starArr[i].x) < 50 && Math.abs(star.y - starArr[i].y) < 50) {
          DrawLine(star.x, star.y, starArr[i].x, starArr[i].y, ctx);
        }
      }
    });
    // 比较鼠标star和所有star的距离
    for (let i = 0; i < starArr.length; i++) {
      if (Math.abs(mouse_star.x - starArr[i].x) < 50 && Math.abs(mouse_star.y - starArr[i].y) < 50) {
        DrawLine(mouse_star.x, mouse_star.y, starArr[i].x, starArr[i].y, ctx);
      }
    }
  }, 50);
}
const PauseTimer = () => {
  clearInterval(timer)
}

watch(screenWidth, (val) => {
  screenWidth.value = val
  star_canvas.value!.width = screenWidth.value;
  initCanvas()
})
watch(screenHeight, (val) => {
  screenHeight.value = val
  star_canvas.value!.height = screenHeight.value;
  initCanvas()
})
onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = star_content.value!.clientWidth
      screenHeight.value = star_content.value!.clientHeight
    })()
  }
  screenWidth.value = star_content.value!.clientWidth
  screenHeight.value = star_content.value!.clientHeight
  initCanvas();
})

onBeforeUnmount(() => {
  PauseTimer()
});
</script>

<style scoped>
#star_canvas {
  background-color: #000000;
}

.star_content {
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
}
:slotted(div){
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  z-index: 99
}
</style>
