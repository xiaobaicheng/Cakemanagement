<template>
  <div class="file-show">
    <el-image :src="icon" fit="fill" class="image-shwos"></el-image>
    <div class="disk-info">
      <p>{{ diskInfo.name }}</p>
      <el-progress :percentage="bits" />
      <p>总共:{{ diskInfo.totle }}; 可用:{{ diskInfo.current }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElImage, ElProgress } from "element-plus";
import { computed } from "vue";
import icon from "/asset/images/disk.svg";
const diskInfo = defineProps({
  name: String,
  totle: String,
  current: String,
});
let bits = computed(() => {
  let totle = parseInt(diskInfo.totle ?? "0");
  let useCurrent = totle - parseInt(diskInfo.current ?? "0");
  return +(useCurrent / totle).toFixed(2) * 100;
});
</script>

<style lang="less" scoped>
.file-show {
  width: 340px;
  height: 90px;
  display: flex;
  margin-top: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgb(203, 197, 197);
  padding: 10px;
  border-radius: 8px;
  & > .image-shwos {
    flex: 1;
  }
  & > .disk-info {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
