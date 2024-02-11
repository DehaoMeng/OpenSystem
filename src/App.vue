<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
  window.onload = function () {
    if (!window.sessionStorage["login"]) {
      localStorage.clear()
    }
  };
  window.onunload = function () {
    window.sessionStorage["login"] = true;
  };
  window.onbeforeunload = function () {
    window.sessionStorage["login"] = true;
  };
});
</script>


<template>
  <RouterView/>
</template>

<style scoped>

</style>
