<template>
  <div class="login">
    <div class="from-box">
      <div class="login-title">
        <el-icon :size="120" color="#fff">
          <Help />
        </el-icon>
      </div>
      <el-form ref="ruleFormRef" class="login-from" label-position="right" label-width="80px" :model="formLabelAlign"
        style="max-width: 400px" :rules="rules">
        <el-form-item label="账号:" prop="user">
          <el-input size="default" maxlength="18" v-model="formLabelAlign.user" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input size="default" maxlength="18" type="password" v-model="formLabelAlign.password" show-password />
        </el-form-item>

        <el-button type="primary" size="large" class="loginbtn" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Help } from '@element-plus/icons-vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElLoading, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { setToken } from "../tools/auth"
// import baseInfo from './../https/baseInfo'
import { Login } from '../api/user'
import type { FormInstance, FormRules } from 'element-plus'
import { log } from 'console'
// let codeImageSrc = ref(`${baseInfo.baseUrl}/user/getCode`)
const router = useRouter()
let codeFlag = ref(true)
let formLabelAlign = reactive({ user: '', password: '', })
let ruleFormRef = ref<FormInstance>()
// 定义一个校验规则
const rules = reactive<FormRules>({
  user: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 4, max: 15, message: 'Length should be 4 to 15', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 4, max: 15, message: 'Length should be 4 to 15', trigger: 'blur' }
  ],

})
let loading: any;
// 是否加载动画
//登录
const submitForm = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading = ElLoading.service({
        lock: true,
        text: '登录中',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    }
  })
  // console.log(formLabelAlign);
  let { data } = await Login(formLabelAlign)
  if (data.code == '200') {
    setTimeout(() => {
      loading.close()
      router.replace('/home')
      ElMessage({
        message: `${data.msg}`,
        type: 'success'
      })
    }, 1000)
    setToken(data.msg)
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/asset/images/loginBgimage.jpeg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .from-box {
    background-color: #fff;
    border-radius: 5px;

    & .login-title {
      height: 120px;
      padding: 10px 0;
      background-color: #5c72ff;
      border-radius: 5px 5px 0 0;
      margin-bottom: 15px;
      text-align: center;
    }
  }

  & .login-from {
    width: 460px;
    border-radius: 5px;
    padding-bottom: 30px;
    padding: 20px 35px 20px 20px;

    & .loginbtn {
      display: block;
      width: 96%;
      margin: 10px auto;
    }

    & .code-info {
      line-height: normal;

      & .input-code {
        width: 70%;
        min-width: 150px;
      }

      & .image-info {
        width: 30%;
        height: 32px;
      }
    }
  }
}
</style>
