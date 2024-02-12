<script lang="ts" setup>
import type {TableColumnsType} from 'ant-design-vue';
import {computed, onMounted, ref, watch} from "vue";
import {CurriculaVariableInfo} from "@/request/api";
import type {course, EvaCourse} from "@/types/course";
import {useStudentCourseStore} from "@/stores/StudentCourse";

interface Semester {
  value: string,
  label: string
}

const courseid = ref()
const coursename = ref()
const data = ref<EvaCourse[] | null>()
const time = ref<string>()
const items = ref<Semester[]>([]);
const studentCourseStore = useStudentCourseStore()
const Get = () => {
  if (studentCourseStore.getData(time.value as string) != null) {
    data.value = studentCourseStore.getData(time.value as string)
    return
  }
  CurriculaVariableInfo({semester: time.value as string}).then(res => {
    studentCourseStore.addData(JSON.parse(JSON.stringify(res.data)), time.value as string)
    data.value = studentCourseStore.getData(time.value as string)
  })
}
const init = () => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  let semester
  if (currentMonth <= 11 && currentMonth >= 6) { // 本年7月到12月 代表本学年第二学期
    semester = currentYear.toString() + '-' + (currentYear + 1).toString() + '-' + '2'
  } else if (currentMonth <= 5 && currentMonth >= 1) {  // 本年2月到6月 代表本学年第一学期
    semester = currentYear.toString() + '-' + (currentYear + 1).toString() + '-' + '1'
  } else { //本年1月 代表 上一学年的第二学期
    semester = (currentYear - 1).toString() + '-' + currentYear.toString() + '-' + '2'
  }
  items.value.push({
    value: semester,
    label: semester
  })
  time.value = items.value[0].value
  if (semester.substring(semester.length - 1) == '2') {
    items.value.push({
      value: semester.substring(0, semester.length - 1) + '1',
      label: semester.substring(0, semester.length - 1) + '1'
    })
  }
  for (let i = 0; i < 10; i++) {
    semester = (parseInt(semester.substring(0, 4)) - 1).toString() + '-'
        + (parseInt(semester.substring(5, 9)) - 1).toString() + '-' + '2'
    for (let j = 2; j > 0; j--) {
      items.value.push({
        value: semester,
        label: semester
      })
      semester = semester.substring(0, semester.length - 1) + '1'
    }
  }
}

const columns: TableColumnsType = [
  {title: '课号', width: 100, dataIndex: ['course', 'courseid'], key: 'courseid', fixed: 'left'},
  {title: '课程名', width: 100, dataIndex: ['course', 'coursename'], key: 'coursename', fixed: 'left'},
  {title: '开课学院', dataIndex: ['course', 'collegename'], key: 'college', width: 150},
  {title: '任课教师', dataIndex: ['course', 'teachername'], key: 'teachername', width: 150},
  {title: '上课时间', dataIndex: ['course', 'coursetime'], key: 'coursetime', width: 200},
  {title: '开课学期', dataIndex: ['course', 'semester'], key: 'semester', width: 150},
  {title: '成绩', dataIndex: 'grade', key: 'grade', width: 150},
];

const filter_id = computed(() => {
      let data = studentCourseStore.getData(time.value as string)
      if (data != null) {
        return data.filter(
            (data: EvaCourse) =>
                !courseid.value ||
                data.course.courseid.toString().toLowerCase().includes(courseid.value.toLowerCase())
        )
      }
      return null
    }
)
// 搜索后的结果数据
const filterTableData = computed(() => {
  if ((courseid.value || coursename.value) && filter_id.value) {
    let data = filter_id.value.filter(
        (data: EvaCourse) =>
            !coursename.value ||
            data.course.coursename.toLowerCase().includes(coursename.value.toLowerCase())
    )
    return data
  }
  return studentCourseStore.getData(time.value as string)
})

watch(time, Get)

onMounted(init)
</script>
<template>
  <div>
    <a-space :size="20" style="margin: 10px 0">
      <a-row :gutter="[6, 10]">
        <a-col :span="2" class="label">
          课号
        </a-col>
        <a-col :span="4">
          <a-input v-model:value="courseid"></a-input>
        </a-col>
        <a-col :span="1">
          <a-divider type="vertical" orientation="center" style="border-color: #7cb305;height: 80%; margin-top: 4px"/>
        </a-col>

        <a-col :span="2" class="label">
          课程名
        </a-col>
        <a-col :span="4">
          <a-input v-model:value="coursename"></a-input>
        </a-col>
        <a-col>
          <a-divider type="vertical" orientation="center" style="border-color: #7cb305;height: 80%; margin-top: 4px"/>
        </a-col>

        <a-col :span="2" class="label">
          学期
        </a-col>

        <a-col :span="5">
          <a-tooltip placement="bottom">
            <template #title>
              <span>如对数据存在疑问请刷新页面或是联系管理员</span>
            </template>
            <a-select
                v-model:value="time"
                style="width: 180px"
                :options="items.map(item=>({value:item.value, label: item.label}))"
            />
          </a-tooltip>
        </a-col>
      </a-row>
    </a-space>
    <a-table
        :data-source="filterTableData"
        :columns="columns"
        :pagination="{hideOnSinglePage:true}"
        :scroll="{ x: 1500, y: 1000 }"
    />
  </div>
</template>


<style scoped>
.label {
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
