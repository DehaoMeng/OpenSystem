<script lang="ts" setup>
import type {TableColumnsType} from 'ant-design-vue';
import {ref} from "vue";
const time = ref()
const items = ref([
    {
      value:'1',
      label: 'jack'
    },
  {
    value:'2',
    label: 'jack'
  },
  {
    value:'3',
    label: 'jack'
  }
  ]);
const columns: TableColumnsType = [
  {title: '课号', width: 100, dataIndex: 'courseid', key: 'courseid', fixed: 'left'},
  {title: '课程名', width: 100, dataIndex: 'coursename', key: 'coursename', fixed: 'left'},
  {title: '开课学院', dataIndex: 'college', key: 'college', width: 150},
  {title: '任课教师', dataIndex: 'teachername', key: 'teachername', width: 150},
  {title: '上课时间', dataIndex: 'coursetime', key: 'coursetime', width: 150},
  {title: '开课学期', dataIndex: 'semester', key: 'semester', width: 150},
  {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
  {title: 'Column 6', dataIndex: 'address', key: '6', width: 150},
  {title: 'Column 7', dataIndex: 'address', key: '7', width: 150},
  {title: 'Column 8', dataIndex: 'address', key: '8'},
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
</script>
<template>
  <div>
    <a-space :size="20" style="margin: 10px 0">
      <a-row :gutter="[6, 10]">
        <a-col :span="2" class="label">
          课号
        </a-col>
        <a-col :span="4">
          <a-input></a-input>
        </a-col>
        <a-col :span="1">
          <a-divider type="vertical" orientation="center" style="border-color: #7cb305;height: 80%; margin-top: 4px"/>
        </a-col>

        <a-col :span="2" class="label">
          课程名
        </a-col>
        <a-col :span="4">
          <a-input></a-input>
        </a-col>
        <a-col>
          <a-divider type="vertical" orientation="center" style="border-color: #7cb305;height: 80%; margin-top: 4px"/>
        </a-col>

        <a-col :span="2" class="label">
          学期
        </a-col>

        <a-col :span="8">
          <a-select
              v-model:value="time"
              style="width: 180px"
              :options="items.map(item=>({value:item.value, label: item.label}))"
          />
        </a-col>

      </a-row>
    </a-space>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>action</a>
        </template>
      </template>
    </a-table>

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
