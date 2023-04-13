import router from "./router";
import store from "./store";
import Cookies from "js-cookie";

//根据id请求接口获取规则
let whiteList = ["/about", "/login"];

router.beforeEach(async (to, from, next) => {
  const token = Cookies.get("token");
  // 判断用户是否登录
  if (token) {
    if (to.path == "/login") {
      next("/");
    } else {
      //判断是不是已经请求拿了路由规则了
      if (store.state.asyncRoute.length == 0) {
        // 路由权限数据为空时, 获取路由权限数据
        const _asyncRoutes = await store.dispatch("getRouter");
        _asyncRoutes.forEach((item) => {
          router.addRoute(item);
        });
        //继续跳转
        next(to.path);
      } else {
        if (to.matched.length != 0) {
          next();
        } else {
          alert("无页面权限");
          next(from.path);
        }
      }
    }
  } else {
    // 未登录时, 判断访问页面是否需要登录才能访问(白名单), 在白名单内的页面可以直接访问, 否则跳转到登录页
    if (whiteList.indexOf(to.path) != -1) {
      next();
    } else {
      next("/login");
    }
  }
});
