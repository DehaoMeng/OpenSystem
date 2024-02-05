<script setup lang="ts">

import LoginHeader from "@/components/Login/LoginHeader.vue";
import Background from "@/components/backgrounds/Background.vue";
import BoxFluxay from "@/components/box/BoxFluxay.vue";
import LoginMain from "@/components/Login/LoginMain.vue";
</script>

<template>
  <a-layout class="layout">
    <LoginHeader/>
    <a-layout-content>
      <Background>
        <BoxFluxay class="box-login">
          <LoginMain/>
        </BoxFluxay>
      </Background>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.layout {
  height: 100%;
}
.box-login{
  width: 40vw;
  height: 50vh;
}
</style>
