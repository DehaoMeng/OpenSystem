<script setup lang="ts">
import {useMessageStore} from "@/stores/Message";
import {storeToRefs} from "pinia";
import {useTokenStore} from "@/stores/Token";
import {type Ref, ref} from "vue";
import ImagePoke from "@/components/backgrounds/Image-Poke.vue";

const messageStore = useMessageStore()
const {message} = storeToRefs(messageStore)
const label: Ref<string> = useTokenStore().root == "student" ? ref("学号") : ref("工号")

</script>
<template>
  <div class="box-msg">
    <a-descriptions title="个人信息" bordered >
      <a-descriptions-item :label="label">{{ message?.userid }}</a-descriptions-item>
      <a-descriptions-item label="姓名">{{ message?.username }}</a-descriptions-item>
      <a-descriptions-item label="头像">
          <ImagePoke :path="message?.buddha" width="10vw"  height="25vh" pop/>
      </a-descriptions-item>
      <a-descriptions-item label="IP">{{ messageStore?.addr }}</a-descriptions-item>
      <a-descriptions-item label="性别">{{ message?.sexy }}</a-descriptions-item>
      <a-descriptions-item label="地址">{{ message?.addr }}</a-descriptions-item>
      <a-descriptions-item label="学院">{{ message?.College }}</a-descriptions-item>
      <a-descriptions-item label="专业">{{ message?.Major }}</a-descriptions-item>
      <a-descriptions-item label="班级" v-if="message?.Class">{{ message?.Class }}</a-descriptions-item>
      <a-descriptions-item label="电话">{{ message?.phone }}</a-descriptions-item>
      <a-descriptions-item label="入学时间">{{ messageStore.createtime }}</a-descriptions-item>
      <a-descriptions-item label="上次登录时间">{{ messageStore.updatatime }}</a-descriptions-item>
    </a-descriptions>
  </div>

</template>

<style scoped>
.box-msg {
  margin: auto;
  top: 30px;
  padding: 30px;
}

</style>
