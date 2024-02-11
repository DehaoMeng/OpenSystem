<script setup lang="ts">

import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import type {CustomResponse} from "@/types/response";
import {useMessageStore} from "@/stores/Message";
import {useTokenStore} from "@/stores/Token";
import type {teacher} from "@/types/teacher";
import type {student, updateStudent} from "@/types/student";
import {GetMessage} from "@/request/api";
import Header from "@/components/General/Header.vue";
import {exit} from "@/utils/exit";
import Slider from "@/components/General/Slider.vue";
import {useUpdateMessageStore} from "@/stores/UpdateMessage";
import {QuestionCircleOutlined} from "@ant-design/icons-vue";

const messageStore = useMessageStore()
const updateMessageStore = useUpdateMessageStore()
const tokenStore = useTokenStore()
const name = ref<string>()
onBeforeMount(async ()=>{
  if (tokenStore.root) {
    await GetMessage(tokenStore.root).then((res: CustomResponse<teacher | student>) => {
      messageStore.setMessage(res.data as student)
      updateMessageStore.update_Message(res.data as updateStudent)
      name.value = messageStore.message!.username
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
    <a-tooltip placement="left">
      <template #title>
        <span>添加QQ好友联系管理员:1234567890</span>
      </template>
      <a-float-button>
        <template #icon>
          <QuestionCircleOutlined/>
        </template>
      </a-float-button>
    </a-tooltip>
  </a-layout>
</template>

<style scoped>
</style>
