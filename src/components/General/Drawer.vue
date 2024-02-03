<!-- TODO-->
<script lang="ts" setup>
import {computed, reactive, type Ref, ref, onBeforeUnmount} from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import type {Rule} from 'ant-design-vue/es/form';
import {useMessageStore} from "@/stores/Message";
import {useTokenStore} from "@/stores/Token";
import {storeToRefs} from "pinia";
import {GetMessage} from "@/request/api";
import type {CustomResponse} from "@/types/response";
import type {teacher} from "@/types/teacher";
import type {student} from "@/types/student";
import {exit} from "@/utils/exit";

defineProps(['open', 'onOpen', 'onClose'])

const messageStore = useMessageStore();
const label: Ref<string> = useTokenStore().root == "student" ? ref("学号") : ref("工号")
</script>


<template>
  <a-drawer
      title="修改个人信息"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >
    <a-form :model="messageStore.message" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item :label="label" name="userid">
            {{ messageStore.message?.userid }}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="姓名" name="username">
            {{ messageStore.message?.username }}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="入学时间" name="createtime">
            {{ messageStore.createtime }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="学院" name="college">
            {{ messageStore.message?.College }}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="专业" name="major">
            {{ messageStore.message?.Major }}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="班级" name="college" v-show="messageStore.message?.Class">
            {{ messageStore.message?.Class }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="性别" name="sexy">
            <a-select :value="messageStore.message!.sexy" @change="messageStore.change_sexy">
              <a-select-option value="男" lable="男"></a-select-option>
              <a-select-option value="女" lable="女"></a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="住址" name="addrss">
            <a-input type="text" v-model:value="messageStore.message!.addr" ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="DateTime" name="dateTime">
            <a-date-picker

                style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
                :rows="4"
                placeholder="please enter url description"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button >Cancel</a-button>
        <a-button type="primary">Submit</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

