<script setup lang="ts">
import {toRefs} from "vue";

const props = withDefaults(defineProps<{
  color?: string
}>(), {
  color: 'deepskyblue'
})
const {color} = toRefs(props)

</script>

<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<style scoped>
.box {
  color: azure;
  box-shadow: 10px 10px 30px aliceblue, -10px -10px 30px blanchedalmond;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.box::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background-color: v-bind(color);
  z-index: -2;
  left: 50%;
  top: 50%;
  transform-origin: left top;
  animation: rotation 5s linear infinite;
}

.box::after {
  content: '';
  position: absolute;
  --w: 3px;
  width: calc(100% - 2 * var(--w));
  height: calc(100% - 2 * var(--w));
  left: var(--w);
  top: var(--w);
  background-color: rgba(0, 0, 0, 1);
  z-index: -1;
  border-radius: inherit;

}

@keyframes rotation {
  to {
    transform: rotate(1turn);
  }
}
</style>
