<template>
  <div class="home">
    <el-container>
      <el-aside class="leftMenu" :style="{ width: leftDistance }">
        <h1>蛋糕后台管理系统</h1>
        <el-menu :default-active="defaultActive" style="border: none" :unique-opened="true" background-color="#354254"
          active-text-color="#ffd04b" text-color="#fff" :router="true">
          <el-sub-menu v-for="(item, index) in menumItem" :key="index" :index="item.index">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(childrenItem, childrenIndex) in item.children" :key="index"
                :index="childrenItem.index">{{ childrenItem.title }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main class="container" :style="{ marginLeft: leftyou }">
        <el-container>
          <el-header class="headers">
            <el-icon class="icons" @click="changeMenu" :size="32" color="#79bbff">
              <Operation />
            </el-icon>
            <div class="user-info">
              <el-dropdown v-if="isLogin" class="vatarts">
                <el-avatar> admin </el-avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="exitLog">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button v-else type="success" :text="true" size="large" @click="goLogin">登录</el-button>
            </div>
          </el-header>
          <el-main style="box-sizing: border-box">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ElContainer, ElAside, ElMain, ElButton, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElAvatar, ElDropdown, ElDropdownItem, ElMessageBox, ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { readonly, ref, markRaw, computed, onMounted } from 'vue'
import { Orange, Coin, Files, Operation, Calendar, Compass } from '@element-plus/icons-vue'
import { useUserInfo } from '../pinia/userInfo'
import { getToken, removeToken } from "../tools/auth"
let router = useRouter()
let route = useRoute()
let leftDistance = ref<string>('200px')
let leftyou = ref<string>('200px')
let leftFlag = ref(true)
let defaultActive = ref<string>('/home/archived')
onMounted(() => {
  defaultActive.value = route.path
})
// let userInfo = computed(() => {
//   let users = useUserInfo()
//   if (JSON.stringify(users.userInfo) === '{}') return '未知'
//   else {
//     if (Object.prototype.hasOwnProperty.call(users.userInfo, 'userinfo') && typeof users.userInfo.userinfo === 'object' && users.userInfo.userinfo !== null && users.userInfo.userinfo.username) {
//       return users.userInfo.userinfo.username
//     } else {
//       return '未知'
//     }
//   }
// })
let isLogin = computed(() => {
  let users = getToken()

  if (users) {
    return true
  } else {
    return false
  }
})

let menumItem = readonly([
  {
    name: '商品管理',
    icon: markRaw(Files),
    index: '1',
    children: [{ index: '/home/archived', title: '商品列表' }]
  },
  {
    name: '购物车',
    icon: markRaw(Coin),
    index: '2',
    children: [{ index: '/home/Shopcat', title: '购物车列表' }]
  },
  // {
  //   name: '视频管理',
  //   icon: markRaw(Orange),
  //   index: '3',
  //   children: [{ index: '/home/vedioList', title: '视频列表' }]
  // },
  // {
  //   name: '节目管理',
  //   icon: markRaw(Calendar),
  //   index: '4',
  //   children: [
  //     { index: '/home/paramsList', title: '节目列表' },
  //     { index: '/home/paramsAdd', title: '添加节目' }
  //   ]
  // },
  // {
  //   name: '剧集管理',
  //   icon: markRaw(Compass),
  //   index: '5',
  //   children: [
  //     { index: '/home/seriesList', title: '剧集列表' },
  //     { index: '/home/seriesAdd', title: '添加剧集' }
  //   ]
  // },
  // {
  //   name: '内容编排',
  //   icon: markRaw(Compass),
  //   index: '6',
  //   children: [{ index: '/home/contentArrange', title: '内容编排' }]
  // }
])
function exitLog(): void {
  ElMessageBox.confirm('是否确定退出登录?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info'
  })
    .then(() => {
      removeToken();
      router.replace('/login')
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '退出失败!'
      })
    })
}
function goLogin() {
  removeToken();
  router.replace('/login')
}
function changeMenu() {
  if (leftFlag.value) {
    leftDistance.value = '0px'
    leftyou.value = '0px'
  } else {
    leftDistance.value = '200px'
    leftyou.value = '200px'
  }
  leftFlag.value = !leftFlag.value
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;

  .leftMenu {
    background-color: #354254;
    position: fixed;
    height: 100vh;
    width: 200px;
    transition: all 0.3s;

    &>h1 {
      text-align: center;
      color: #fff;
      padding: 15px 0;
    }
  }

  .container {
    padding: 0px;
    transition: all 0.3s;

    // margin-left: 200px;
    .headers {
      padding: 0;
      line-height: 60px;
      border-bottom: 2px solid #79bbff;
      display: flex;
      box-sizing: border-box;
      padding: 0 30px 0 15px;
      justify-content: space-between;
      align-items: center;

      .icons {
        cursor: pointer;
      }

      .vatarts {
        display: flex;
        align-self: center;
      }
    }
  }
}
</style>
