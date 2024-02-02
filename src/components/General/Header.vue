<script setup lang="ts">
import {ref, toRefs} from "vue";
import {HeartTwoTone, SettingOutlined, CloseOutlined} from "@ant-design/icons-vue"
import {useTokenStore} from "@/stores/Token";
import type {Events} from "@/types/events";
import {useSchoolStore} from "@/stores/School";
import Drawer from "@/components/General/Drawer.vue";
import {exit} from "@/utils/exit";

const props = defineProps(['name'])
const {name} = toRefs(props)
const token = useTokenStore()
const school = useSchoolStore()
const showDrawer = ref<boolean>(false)
const onOpen = () => {
  showDrawer.value = true
}
const onClose = () => {
  showDrawer.value = false
}
const onClick = ({item, key, KeyPath}: Events) => {
  if (key == '1') {
    showDrawer.value = true
  } else {
    exit('success', '退出成功', '用户已退出，请重新登陆！')
  }
}
</script>

<template>
  <a-layout-header>
    <div class="header">
      <span class="title">{{ school.school_name}}</span>
      <a-dropdown class="menu-user">
        <a class="ant-dropdown-link" @click.prevent>
          {{ name }}
          <heart-two-tone two-tone-color="#eb2f96"/>
        </a>
        <template #overlay>
          <a-menu @click="onClick">
            <a-menu-item key="1" class="sub-menu"><SettingOutlined/> 管理</a-menu-item>
            <a-menu-item key="2" class="sub-menu"><CloseOutlined/> 退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
  <Drawer :open="showDrawer" :onOpen="onOpen" :onClose="onClose"/>
</template>

<style scoped>
.ant-layout-header {
  background: linear-gradient(to right, darkgrey, lightgray, darkgrey, gray);
}

.header {
  height: 100%;
  width: 100%;
  color: blanchedalmond;
  text-align: center;
  font-size: 35px;
}

.ant-dropdown-link {
  font-size: 20px;
  color: aliceblue;
}

.menu-user {
  position: relative;
  left: 42vw;
}
.sub-menu{
  margin: auto;
  width: 300px;
}
</style>
