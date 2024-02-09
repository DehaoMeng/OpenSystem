<script lang="ts" setup>
import {type Ref, ref} from 'vue';
import {useMessageStore} from "@/stores/Message";
import {useTokenStore} from "@/stores/Token";
import {useUpdateMessageStore} from "@/stores/UpdateMessage";
import {PlusOutlined} from '@ant-design/icons-vue';
import {message, type UploadProps} from 'ant-design-vue';
import {UpdateMessage} from "@/request/api";
import type {student, updateStudent} from "@/types/student";

defineProps(['open'])
const Emits = defineEmits(['onClose', 'onReset'])
const messageStore = useMessageStore();
const label: Ref<string> = useTokenStore().root == "student" ? ref("学号") : ref("工号")
const updateMessageStore = useUpdateMessageStore()
const err_msg = ref('')
const check = () => {
  if (updateMessageStore.updateMessage?.phone.length != 0 && updateMessageStore.updateMessage?.phone.length != 11) {
    err_msg.value = '当前手机号格式不匹配 请重新输入'
  } else {
    err_msg.value = ''
  }
}
const Close = () => {
  err_msg.value = ''
  Emits('onClose')
}
const reSet = () => {
  Emits('onReset')
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const fileList = ref<UploadProps['fileList']>([]);

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = messageStore.message!.username
};
const headerObj = ref({
  Authorization: localStorage.getItem("token"),
})
const uploadOnChange = (info: any) => {
  let response = info.file.response
  if (response) {
    updateMessageStore.updateMessage!.buddha = response.data.buddha
  }
}

const Submit = () => {
  const tokenStore = useTokenStore()
  if (tokenStore.root && updateMessageStore.diff(messageStore!.message as student) || warning()) {
    UpdateMessage(tokenStore.root as string, updateMessageStore.updateMessage as updateStudent).then(res => {
      messageStore.setMessage(res.data as student)
      updateMessageStore.update_Message(JSON.parse(JSON.stringify(res.data)) as updateStudent)
    })
  }
  Emits('onClose')
}

const warning = () => {
  message.warning('本次提交无修改信息!');
  return false
};
</script>


<template>
  <a-drawer
      title="修改个人信息"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="Close"
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
            <a-select :value="updateMessageStore.updateMessage!.sexy" @change="updateMessageStore.change_sexy">
              <a-select-option value="男" lable="男"></a-select-option>
              <a-select-option value="女" lable="女"></a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="住址" name="addrss">
            <a-input type="text" v-model:value="updateMessageStore.updateMessage!.addr"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="联系方式" name="phone">
            <a-input type="text" v-model:value="updateMessageStore.updateMessage!.phone" @focusout="check"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="err">
            <br/>
            <br/>
            {{ err_msg }}
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item name="buddha" label="头像">
            <div class="clearfix">
              <a-upload
                  v-model:file-list="fileList"
                  action="http://localhost:8000/upload-img"
                  list-type="picture-card"
                  @preview="handlePreview"
                  :headers="headerObj"
                  @change="uploadOnChange"
              >
                <div v-if="fileList!.length < 1">
                  <plus-outlined/>
                  <div style="margin-top: 8px">上传</div>
                </div>
              </a-upload>
              <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage"/>
              </a-modal>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="Close">取消</a-button>
        <a-button @click="reSet">重置</a-button>
        <a-button type="primary" @click="Submit">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
