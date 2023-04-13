import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import { initRoutes, resetRouter } from "../router";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    asyncRoute: [],
    routes: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.asyncRoute = routes;
      state.routes = initRoutes.concat(routes);
    },
    RESET_ROUTES: (state) => {
      state.asyncRoute = [];
      state.routes = [];
    },
  },
  actions: {
    getRouter({ commit }) {
      function parseRouter(routeArr) {
        let _newArr = [];
        routeArr.forEach((item) => {
          let _newItem = Object.assign({}, item);
          let _str = item.component;
          _newItem.component = () => {
            return import(`@/views${_str}`);
          };
          _newArr.push(_newItem);
        });
        return _newArr;
      }
      let _id = Cookies.get("id");
      if (_id) {
        return new Promise((resolve) => {
          let _local = JSON.parse(localStorage.getItem("menu"));
          if (_local) {
            let _newArr = parseRouter(_local);
            commit("SET_ROUTES", _newArr);
            resolve(_newArr);
          } else {
            axios.get("http://localhost:3000/routes?id=" + _id).then((res) => {
              let _newArr = parseRouter(res.data.data);
              localStorage.setItem("menu", JSON.stringify(res.data.data));
              commit("SET_ROUTES", _newArr);
              resolve(_newArr);
            });
          }
        });
      }
    },
    //按钮
    //登录-拉去一下用户的权限code ["some1","SOMETHING"]
    getCode() {},
    resetRouter({ commit }) {
      resetRouter();
      commit("RESET_ROUTES");
    },
  },
  modules: {},
});
