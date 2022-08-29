  <template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="_id" label="Id" width="180" />
    <el-table-column prop="name" label="Name" width="130" />
    <el-table-column prop="message" label="描述" width="240" />
    <el-table-column prop="price" label="价格" width="100" />
    <el-table-column prop="shopimg" label="商品图片">
      <template #default="scope">
        <el-image style="width: 70px; height: 70px" :src="baseURL + scope.row.shopimg" alt=""></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作">
      <template #default="scope">
        <el-button @click="delOrRec(scope.row._id)" class="editBtn" type="danger" :icon="Delete"></el-button>
        <!-- <el-image  style="width: 70px; height: 70px" :src="baseURL + scope.row.imgurl" alt="" ></el-image> -->
      </template>
    </el-table-column>
  </el-table>
  </template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { getShop, deletShop,  } from '../api/shopcat';
import { baseURL } from '../https/baseInfo'
import {
  Delete,

} from '@element-plus/icons-vue'
import { ElLoading, ElMessage } from 'element-plus'

type addType = {
  _id?: any,
  name: string,
  message: string,
  price: string,
  imgurl?: string,
  file: any
}
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


</script>
  <style>
  </style>