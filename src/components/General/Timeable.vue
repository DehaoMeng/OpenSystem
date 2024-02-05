<script setup lang="ts">

</script>

<template>
  <div>
    <a-row>
      <a-col :span="2" class="top">
        <div class="data">
          <a-col class="time">
            时间
          </a-col>
          <a-col
              v-for="item in 11"
              :key="item"
              class="date thisMonth tip"
              :span="1"
          >
            <div class="time">{{ item }}</div>
          </a-col>
        </div>
      </a-col>

    </a-row>
  </div>
</template>

<style scoped>
.time{
  width: 100px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  border-radius: 10px;
  border: #54a29e solid;
}
.top{
  position: relative;
  top: 20px;
  left: 10px;
}
</style>
