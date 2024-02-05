<script lang="ts" setup>
import {ref, VueElement, h, type Ref, computed} from 'vue';
import {
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  IdcardOutlined,
  UnorderedListOutlined,
  AreaChartOutlined,
  DeploymentUnitOutlined,
  AppstoreAddOutlined,
  LikeOutlined
} from '@ant-design/icons-vue';
import type {MenuProps, ItemType} from 'ant-design-vue';
import router from "@/router";
import {useTokenStore} from "@/stores/Token";
const selectedKeys = ref<string[]>([router.currentRoute.value.name as string]);
const collapsed = ref<boolean>(true);

function getItem(
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const student_items: Ref<ItemType[]> = ref([
  getItem('首页', 'index', () => h(HomeOutlined), [
    getItem('信息', 'g1', null, [
      getItem('个人资料', 'home', () => h(IdcardOutlined))], 'group'),
    getItem('课程', 'g2', null, [
      getItem('已选课程', 'student-course-choosing', () => h(UnorderedListOutlined)),
      getItem('课程表', 'timetable', () => h(AreaChartOutlined))], 'group'),
  ]),
  {type: 'divider'},
  getItem('课程', 'sub2', () => h(AppstoreOutlined), [
    getItem('选课', 'student-course', () => h(AppstoreAddOutlined)),
    getItem('暂定', '6'),
    getItem('暂定', 'sub3', null, [
      getItem('暂定', '7'),
      getItem('暂定', '8')]),
  ]),

  {type: 'divider'},

  getItem('评价', 'sub4', () => h(DeploymentUnitOutlined), [
    getItem('教师评价', 'evaluate', () => h(LikeOutlined)),
    getItem('暂定', '10'),
    getItem('暂定', '11'),
    getItem('暂定', '12'),
  ]),

]);

const teacher_items: Ref<ItemType[]> = ref([
  getItem('首页', 'index', () => h(HomeOutlined), [
    getItem('信息', 'g1', null, [
      getItem('个人资料', 'home', () => h(IdcardOutlined))], 'group'),
    getItem('任课', 'g2', null, [
      getItem('任课', 'teacher-course-choosing', () => h(UnorderedListOutlined)),
      getItem('课程表', 'timetable', () => h(AreaChartOutlined))], 'group'),
  ]),
  {type: 'divider'},
  getItem('课程', 'sub2', () => h(AppstoreOutlined), [
    getItem('课程管理', 'teacher-course', () => h(SettingOutlined)),
    getItem('暂定', '6'),
    getItem('暂定', 'sub3', null, [
      getItem('暂定', '7'),
      getItem('暂定', '8')]),
  ]),

  {type: 'divider'},

  getItem('评价', 'sub4', () => h(SettingOutlined), [
    getItem('综合成绩', 'grade'),
    getItem('暂定', '10'),
    getItem('暂定', '11'),
    getItem('暂定', '12'),
  ]),
])

const handleClick: MenuProps['onClick'] = e => {
  console.log('click', e.key);
  if (typeof e.key == "string") {
    router.push({name: e.key})
  }
};
const items = computed(() => {
  if (useTokenStore().root == 'student') {
    return student_items.value
  } else {
    return teacher_items.value
  }
})
</script>


<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
    <a-menu
        v-model:selectedKeys="selectedKeys"
        style="width: 100%"
        mode="vertical"
        :items="items"
        @click="handleClick"
    ></a-menu>
  </a-layout-sider>
</template>

