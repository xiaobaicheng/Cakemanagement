import { defineStore } from "pinia";
import { getLoStorage } from "./../tools/tools";
export const useUserInfo = defineStore("userInfo", {
  state: () => {
    return {
      userInfo: getLoStorage("infoObject"),
    };
  },
});
