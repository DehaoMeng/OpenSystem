<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => {
  window.onload = function () {
    if (!window.sessionStorage["login"]) {
      // 关闭浏览器时清空
      //window.localStorage.removeItem("userInfo"); 或者写这俩
      //window.localStorage.removeItem("token");
      // globalStore.setToken("");
      // globalStore.setUserInfo("");
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
