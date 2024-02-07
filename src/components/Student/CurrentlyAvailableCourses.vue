<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import type {TableColumnsType} from "ant-design-vue";
import {CourseInfo} from "@/request/api";
import type {paginate} from "@/types/axios";
import type {course} from "@/types/course";
import {useCourseStore} from "@/stores/Course";

const courseStore = useCourseStore();
const current_page = ref(1)
const courseid = ref()
const coursename = ref()
const global_search = ref(false)
const title = ref('该搜索仅可搜索访问过的数据')
const getPopupContainer = (trigger: HTMLElement) => {
  return trigger.parentElement;
}
const func = (page: number) => {
  CourseInfo({page: page, size: courseStore.size} as paginate).then((res) => {
    courseStore.record_nums(res.num as number)
    for (let i = 0; i < res.data.length; i++) {
      courseStore.addData(JSON.parse(JSON.stringify(res.data[i])))
    }
  })
  courseStore.loading_pages.push(page)
}

const columns: TableColumnsType = [
  {title: '课号', width: 100, dataIndex: 'courseid', key: 'courseid', fixed: 'left'},
  {title: '课程名', width: 100, dataIndex: 'coursename', key: 'coursename', fixed: 'left'},
  {title: '开课学院', dataIndex: 'collegename', key: 'collegename', width: 150},
  {title: '任课教师', dataIndex: 'teachername', key: 'teachername', width: 150},
  {title: '上课时间', dataIndex: 'coursetime', key: 'coursetime', width: 250},
  {title: '开课学期', dataIndex: 'semester', key: 'semester', width: 150},
  {
    title: '操作',
    dataIndex: 'selected',
    key: 'selected',
    fixed: 'right',
    width: 100,
  },
];

const onChange = (page: number) => {
  // 切换页面
  if (courseStore.loading_pages.indexOf(page) == -1) {
    func(page)
  }
}

const onClick = (data: any) => {
  console.log(data)
}
const filter_id = computed(() =>
    courseStore.courseData.filter(
        (data: course) =>
            !courseid.value ||
            data.courseid.toString().toLowerCase().includes(courseid.value.toLowerCase())
    )
)
// TODO 搜索后无法正确分页了
const filterTableData = computed(() => {
  if (courseid.value || coursename.value) {
    let data = filter_id.value.filter(
        (data: course) =>
            !coursename.value ||
            data.coursename.toLowerCase().includes(coursename.value.toLowerCase())
    ).slice((current_page.value - 1) * courseStore.size)
    courseStore.record_nums(data.length/courseStore.size)
    return data
  }

  return courseStore.getPageData(current_page.value)
})

watch(global_search, (val) => {
  if (val) {
    for (let i = 1; i <= courseStore.nums; i++) {
      onChange(i)
    }
    title.value = '已开启全局搜索，已为您加载全部数据'
  } else {
    title.value = '该搜索仅可搜索访问过的数据'
  }
})

onMounted(() => onChange(current_page.value))

</script>

<template>
  <div class="main">
    <a-row :gutter="[16,16]">
      <a-col :span="4">
        <a-input placeholder="请输入课程号" addonBefore="课程号" v-model:value="courseid"></a-input>
      </a-col>
      <a-col :span="5">
        <a-input placeholder="请输入课程名称" addonBefore="课程名称" v-model:value="coursename"></a-input>
      </a-col>
      <a-col :span="1" style="margin: 3px 0">
        <a-tooltip placement="bottom" title="开启全局搜索会自动加载所有数据,可能会有所卡顿" >
          <a-switch v-model:checked="global_search"/>
        </a-tooltip>
      </a-col>
      <a-col :span="5">
        <a-input :placeholder="title" :bordered="false" disabled style="cursor: default"></a-input>
      </a-col>
    </a-row>
    <a-table :columns="columns" :data-source="filterTableData" :scroll="{ x: 1500, y: 500 }"
             :pagination="false" style="margin: 10px 0">
      <template #bodyCell="{record,column}">
        <template v-if="column.key == 'selected'">
          <a-button @click="onClick(record)">{{ record.selected ? "退课" : "选课" }}</a-button>
        </template>
      </template>
    </a-table>
    <a-pagination
        v-model:current="current_page"
        :total="courseStore.total_nums"
        v-model:pageSize="courseStore.size"
        :default-page-size="courseStore.size"
        show-less-items
        hideOnSinglePage
        @change="onChange(current_page)"
    />
    <!--  total_nums 在搜索功能下也应该发生改变   -->
  </div>

</template>

<style scoped>
.main {
  padding: 10px 10px;
}
</style>
