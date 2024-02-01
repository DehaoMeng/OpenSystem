<script lang="ts" setup>
import {ref} from 'vue';
import type {LoginData} from "@/types/request";
import {login} from "@/request/api"
import {useTokenStore} from "@/stores/Token";
import type { AxiosResponse} from "axios";
import router from "@/router";
const err_msg = ref<string | null>()
const id_err = ref<string>('')
const pwd_err = ref<string>('')
const token = useTokenStore()
const formState = ref<LoginData>({
  id: '',
  password: '',
});
const manager = ref<string>('')
const onFocus = () => {
  id_err.value = ''
  pwd_err.value = ''
  err_msg.value = ''
}

const onSubmit = () => {
  id_err.value = ''
  pwd_err.value = ''
  if (formState.value.id === '' || formState.value.id.length !== 10) {
    id_err.value = '用户名格式不正确'
    console.log(id_err.value)
    return
  }
  if (formState.value.password === '' ||
      formState.value.password.length < 8 ||
      formState.value.password.length > 16) {
    pwd_err.value = '密码格式不正确，请输入8-16位密码'
    return
  }
  if (formState.value.id.substring(0) == '2'){
    manager.value = 'teacher'
  }else {
    manager.value = 'student'
  }
  login(formState.value, manager.value).then((res: AxiosResponse) => {
    if (res.code == 200){
      token.setToken(res.data.token, manager.value)
      console.log(token)
      router.push({name: manager.value})  // 跳转到相应页面
    }else {
      err_msg.value = res.msg
    }
  }).catch(err => {
    console.log(err.msg)
  })

}
</script>


<template>
  <div class="form">
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :hideRequiredMark="true"
    >
      <a-form-item
          label="用户名"
          name="id"
          :required="true"
          :help="id_err"
      >
        <a-input v-model:value="formState.id"
                 placeholder="请输入学号/工号"
                 :onfocus="onFocus"
        />
      </a-form-item>

      <a-form-item
          label="密码"
          name="password"
          :required="true"
          :help="pwd_err"
      >
        <a-input-password v-model:value="formState.password"
                          autocomplete="off"
                          placeholder="请输入密码"
                          :onfocus="onFocus"
        />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="default"
                  html-type="submit"
                  @keyup.enter="onSubmit"
                  @click="onSubmit"
                  ghost
        >
          登陆
        </a-button>

      </a-form-item>
      <a-form-item v-if="err_msg" :wrapper-col="{offset: 2, span: 30}">
        <div class="err-msg">{{ err_msg }}</div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.form {
  height: 110%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}

:deep(.ant-form-item-label .ant-form-item-required) {
  color: azure;
}

.err-msg {
  color: azure;
  display: flex;
  align-content: center;
  justify-content: center;
}

:deep(.ant-btn) {
  width: 150px;
}

:deep(.ant-form-show-help) {
  color: indianred;
}
:deep(.ant-form){
  width: 80%;
}
:deep(.ant-input){
  width: 60%;
}
:deep(.ant-input-password){
  width: 60%;
}
:deep(.ant-input-password .ant-input){
  width: 100%;
}
</style>
