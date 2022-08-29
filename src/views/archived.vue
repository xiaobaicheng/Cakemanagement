<template>
  <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="_id" label="Id" width="180" />
    <el-table-column prop="name" label="Name" width="130" />
    <el-table-column prop="message" label="描述" width="240" />
    <el-table-column prop="price" label="价格" width="100" />
    <el-table-column prop="imgurl" label="商品图片">
      <template #default="scope">
        <el-image style="width: 70px; height: 70px" :src="baseURL + scope.row.imgurl" alt=""></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作">
      <template #default="scope">
        <el-button class="editBtn" type="primary" :icon="Edit" @click="recommendGroup(scope.row)"></el-button>
        <el-button @click="delOrRec(scope.row._id)" class="editBtn" type="danger" :icon="Delete"></el-button>
        <!-- <el-image  style="width: 70px; height: 70px" :src="baseURL + scope.row.imgurl" alt="" ></el-image> -->
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="新增商品">
    <el-form :model="form">
      <el-form-item label="商品名：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述：" :label-width="formLabelWidth">
        <el-input v-model="form.message" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格：" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off" />

      </el-form-item>
      <el-form-item label="商品图片：" :label-width="formLabelWidth">
        <el-upload action="customize" class="upload-demo" ref="upLoadFiles" :multiple="false" accept="image/*"
          :http-request="uploadfile" :on-remove="handleRemove" :limit="1">
          <el-button>选择图片</el-button>
        </el-upload>

      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="emaitefrom" title="编辑商品">
    <el-form :model="eamitforrom">
      <el-form-item label="商品名：" :label-width="formLabelWidth">
        <el-input v-model="eamitforrom.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述：" :label-width="formLabelWidth">
        <el-input v-model="eamitforrom.message" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格：" :label-width="formLabelWidth">
        <el-input v-model="eamitforrom.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="原图：" :label-width="formLabelWidth">
        <el-image style="width: 70px; height: 70px" :src="baseURL + eamitforrom.imgurl" alt=""></el-image>
      </el-form-item>
      <el-form-item label="商品图片：" :label-width="formLabelWidth">
        <el-upload action="customize" class="upload-demo" ref="upLoadFiles1" :multiple="false" accept="image/*"
          :http-request="uploademitfile" :limit="1">
          <el-button>选择图片</el-button>
        </el-upload>

      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emaitefrom = false">取消</el-button>
        <el-button type="primary" @click="submiteamit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { log } from 'console';
import { ref, reactive } from 'vue';
import { type } from 'os';
import { getShop, deletShop, AddShop, eamitShop } from '../api/shop';
import { baseURL } from '../https/baseInfo'
import {
  Delete,
  Edit,

} from '@element-plus/icons-vue'
import { ElLoading, ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile, UploadInstance } from 'element-plus'
// import type {  } from 'element-plus'

type addType = {
  _id?: any,
  name: string,
  message: string,
  price: string,
  imgurl?: string,
  file: any
}
// 新增数据
const form = reactive<addType>({
  name: '',
  message: '',
  price: '',
  imgurl: '',
  file: null,
})
// 编辑数据
const eamitforrom = reactive<addType>({
  _id: '',
  name: '',
  message: '',
  price: '',
  file: null,
})
let emaitefrom = ref(false);
let tableData: any = ref([])
let loading: any;
const getdata = async () => {
  let { data } = await getShop()
  tableData.value = data.data
}
getdata()
// 删除商品
const delOrRec = async (Id: string) => {
  loading = ElLoading.service({
    lock: true,
    text: '删除中',
    background: 'rgba(0, 0, 0, 0.8)'
  })
  let { data } = await deletShop({ _id: Id })
  console.log(data);

  if (data.code == 200) {
    setTimeout(() => {
      loading.close()
      ElMessage({
        message: `${data.message}`,
        type: 'success'
      })
      getdata();

    }, 500)
  }
}
const dialogFormVisible = ref(false)
const formLabelWidth = '120px'
const uploadfile = (item: any) => {
  form.file = item.file
}
// 确认新增商品
const submit = async () => {
  if (form.name !== '' && form.message !== '' && form.price !== '' && form.file !== null) {
    let parms = new FormData();
    parms.append("name", form.name);
    parms.append("message", form.message);
    parms.append("price", form.price);
    parms.append("file", form.file);
    let { data } = await AddShop(parms)
    ElMessage({
      message: `${data.message}`,
      type: 'success'
    })
    getdata()

  } else {
    ElMessage({
      message: `请补全内容`,
      type: 'warning'
    })
    return;
  }
  dialogFormVisible.value = false

}
function handleRemove() {
}
function uploademitfile(item: any) {
  eamitforrom.file = item.file

}
// 编辑商品详情信息
function recommendGroup(listdata: any) {
  emaitefrom.value = true;
  eamitforrom._id = listdata._id,
    eamitforrom.name = listdata.name,
    eamitforrom.message = listdata.message,
    eamitforrom.price = listdata.price
  eamitforrom.imgurl = listdata.imgurl
}
// 确认提交编辑后的信息
const submiteamit = async () => {
  // 
  let parms = new FormData;
  parms.append('_id', eamitforrom._id);
  parms.append('name', eamitforrom.name);
  parms.append('message', eamitforrom.message);
  parms.append('price', eamitforrom.price)
  parms.append('file', eamitforrom.file)
  let { data } = await eamitShop(parms)
  if (data.code == 200) {
    ElMessage({
      message: `${data.message}`,
      type: 'success'
    })
  }
  emaitefrom.value = false
  getdata();
  // console.log(eamitforrom);

}
</script>
<style scoped>
.editBtn {
  width: 25px;
  height: 23px;
  margin-bottom: 0;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>