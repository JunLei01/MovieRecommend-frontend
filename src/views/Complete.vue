<template>
  <el-col :span="14" :push="5">
    <el-steps :active="active" finish-status="success" style="margin-top: 100px" align-center>
      <el-step title="设置个人信息"/>
      <el-step title="选择你的爱好"/>
      <el-step title="完成"/>
    </el-steps>

    <div class="complete-container">
      <div v-if="active==0">
        <el-upload
            class="avatar-uploader"
            headers=""
            action="/api/face"
            :drag="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
          <!--              :before-upload="beforeAvatarUpload">-->
          <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
            Face
          </el-icon>
        </el-upload>
        <el-form
            ref="userForm"
            class="info-container"
            :model="sizeForm"
            label-width="auto"
            :label-position="labelPosition">
          <el-form-item label="输入昵称">
            <el-input v-model="sizeForm.name" placeholder="请再次输入用户名！"/>
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select
                v-model="sizeForm.gender"
                placeholder="请选择你的性别">
              <el-option label="男" value="男"/>
              <el-option label="女" value="女"/>
            </el-select>
          </el-form-item>

          <el-form-item
              prop="email"
              label="Email"
              :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]">
            <el-input v-model="dynamicValidateForm.email"/>
          </el-form-item>

          <el-form-item label="Activity time">
            <el-col :span="11">
              <el-date-picker
                  v-model="sizeForm.date"
                  type="date"
                  label="Pick a date"
                  placeholder="Pick a date"
                  style="width: 100%"
              />
            </el-col>
          </el-form-item>
        </el-form>
        <el-button style="margin-top: 350px; margin-right: 0px" type="primary" @click="cleanAll">重置</el-button>
        <el-button style="margin-top: 350px; margin-right: 0px" type="primary" @click="next">下一步</el-button>
      </div>

      <div v-if="active==1">
        <div class="info-container-hobby">
          <el-checkbox-group v-model="checkedTypes" :min="0" :max="5" style="margin-top: 80px" size="large"  @change="handleCheckedTypesChange">
            <el-checkbox v-for="(type, index) in types" :key="index" :label="type" style="font-size: medium">{{ type }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button style="margin-top: 230px; margin-right: 0px" type="primary" @click="next2">下一步</el-button>
      </div>

      <div v-if="active==2">
        <div style="margin-top: 150px">
          <h1>Welcome to Panda MR!!</h1>
        </div>
        <el-button style="margin-top: 130px; margin-right: 0px" type="primary" @click="loadingScreen">完成</el-button>
      </div>
    </div>
  </el-col>

</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'
import {ElMessage, ElLoading} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'
import type {UploadProps, FormInstance} from 'element-plus'
import axios from "axios";
import router from "@/router";
import {setToken} from "@/utils/setToken";

let data = new FormData()
const radio1 = ref('New York')

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

const labelPosition = ref('top')

const sizeForm = reactive({
  name: '',
  gender: '',
  date: '',
})



function onSubmit() {
  console.log('submit!')
}

//步骤条
const active = ref(0)
const next = () => {
  if (active.value++ > 2) active.value = 0
  data.append("user_name", sizeForm.name)
  data.append("sex", sizeForm.gender)
  data.append('date', sizeForm.date)
  data.append('email', dynamicValidateForm.email)
}
const back = () => {
  if (active.value > 2) active.value = 0
}

//头像上传
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  console.log(2222, uploadFile)
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


const checkedTypes = ref(['科幻', '动漫'])
const types = ['剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚',
  '恐怖', '犯罪', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠']

const user_types: string = ""
const handleCheckedTypesChange = (value: string[]) => {
  data.append('user_types', String(value))
}

const next2 = () => {
  if (active.value++ > 2) active.value = 0
  console.log(data)
  axios.post('/api/complete', data).then(res => {
    console.log(res, typeof res)
    if (res.data.code === 200) {
      console.log('login successful！')
      ElMessage.success({message: res.data.message})
      setToken("username", res.data.userInfo['user_account_id'])
      console.log(res.data.first)
      sessionStorage.setItem("userInformation", JSON.stringify(res.data.userInfo))
      sessionStorage.setItem("type_recommend", JSON.stringify(res.data.type_recommend))
      sessionStorage.setItem('recommend', JSON.stringify(res.data.recommend))
    } else {
      console.log('login fail!')
      ElMessage.error({message: res.data.message})
    }
  })
}


const fullscreenLoading = ref(false)
const loadingScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
  router.push('/home')
}
</script>


<style scoped>
.complete-container {
  position: absolute;
  right: 200px;
  height: 400px;
  width: 60%;
  top: 130px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  background-color: #fff;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


<style>
.el-radio-group {
  margin-right: 12px;
}

.info-container {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 400px;
}

.info-container-hobby {

}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  top: 100px;
  left: 20px;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>