import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import { getLoStorage } from "./../tools/tools";
import Login from "view/Login.vue";
import { log } from "console";
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // beforeEnter() {
    //   // 判断我们是否有token值,没有的话才可以跳转到登录页面
    //   // let tokeninfoFlog = getLoStorage("infoObject");
    //   // if (Object.prototype.hasOwnProperty.call(tokeninfoFlog, "tokeninfo")) {
    //     router.replace("/home");
    //   // }
    // },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("view/home.vue"),
    redirect: "/home/archived",
    children: [
      { path: "/home/archived", name: "Archived", component: () => import("view/archived.vue") },
      { path: "/home/Shopcat", name: "Shopcat", component: () => import("view/Shopcat.vue") },

    ],
    // 只有登录了才可以进入到首页
  },
  {
    path: "/:error*",
    name: "Error",
    component: () => import("view/error.vue"),
  },
];

//你好
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((from, to, next) => {
  // console.log(from);
  
  // if (
    
  //   from.name !== "Login" &&
  //   from.name !== "Error"
  // ) {
  //   console.log(1);
    
  //   next("/login");
  // } else {
    next();
  // }
  // next();
});
export default router;
