<script setup lang="ts">

import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import type {CustomResponse} from "@/types/response";
import {useMessageStore} from "@/stores/Message";
import {useTokenStore} from "@/stores/Token";
import type {teacher} from "@/types/teacher";
import type {student} from "@/types/student";
import {GetMessage} from "@/request/api";
import Header from "@/components/General/Header.vue";
import {exit} from "@/utils/exit";
import Slider from "@/components/General/Slider.vue";

const messageStore = useMessageStore()
const tokenStore = useTokenStore()
const msg = ref<teacher | student>()
const name = ref<string>()
onBeforeMount(async ()=>{
  if (tokenStore.root) {
    await GetMessage(tokenStore.root).then((res: CustomResponse<teacher | student>) => {
      msg.value = res.data
      messageStore.setMessage(msg.value)
      name.value = msg.value.username
    }).catch(() => {
      exit('error', '用户过期', '用户信息已过期，请重新登陆！')
    })
  }
})

</script>

<template>
  <a-layout>
    <Header :name="name"/>
    <a-layout :has-sider="true" class="main-layout" :style="{ overflow: 'auto', height: '92vh'}">
        <Slider/>
      <a-layout-content>
        <RouterView/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
</style>
