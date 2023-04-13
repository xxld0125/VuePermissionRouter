import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue";

Vue.use(VueRouter);

export const initRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = new VueRouter({
  routes: initRoutes,
});

export function resetRouter() {
  const newRouter = new VueRouter({
    routes: initRoutes,
  });

  router.matcher = newRouter.matcher;
}
export default router;
