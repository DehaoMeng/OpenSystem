<script setup lang="ts">
import {useSchoolStore} from "@/stores/School";

const school = useSchoolStore()
</script>

<template>
  <a-layout-header>
    <div class="header">
      {{ school.school_name }}
    </div>
  </a-layout-header>
</template>

<style scoped>
.header {
  height: 100%;
  width: 100%;
  color: blanchedalmond;
  text-align: center;
  font-size: 35px;
}

.ant-layout-header {
  background: linear-gradient(to right, darkgrey, lightgray, darkgrey, gray);
}
</style>
