<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {TableColumnsType} from "ant-design-vue";
import {CourseInfo} from "@/request/api";
import type {paginate} from "@/types/axios";
import type {course} from "@/types/course";
import {useCourseStore} from "@/stores/Course";
import {assignWith} from "lodash-es";
import {GetCourseID} from "@/utils/course";

const courseStore = useCourseStore();
const current_page = ref(1)
const courseid = ref()
const coursename = ref()
const func = async () => {
  await CourseInfo({page: current_page.value, size: courseStore.size} as paginate).then((res) => {
    courseStore.record_nums(res.num as number)
    for (let i = 0; i < res.data.length; i++) {
      courseStore.addData(JSON.parse(JSON.stringify(res.data[i])))
    }
  })
  courseStore.loading_pages.push(current_page.value)
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
    func()
  }
}

const onClick = (data: any) => {
  console.log(data)
}
const filter_id = computed(() =>
    courseStore.courseData.filter(
        (data: course) =>
            !courseid.value ||
            data.courseid!.toLowerCase().includes(courseid.value.toLowerCase())
    )
)

const filterTableData = computed(() => {
  if (courseid.value || coursename.value) {
    return filter_id.value.filter(
        (data: course) =>
          !coursename.value ||
            data.coursename.toLowerCase().includes(coursename.value.toLowerCase())
    )
  }
  return courseStore.getPageData(current_page.value)
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
      <a-col :span="5">
        <a-input placeholder="该搜索仅可搜索访问过的数据"  :bordered="false" disabled style="cursor: default"></a-input>
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
        @change="onChange"
    />
  </div>

</template>

<style scoped>
.main {
  padding: 10px 10px;
}
</style>
