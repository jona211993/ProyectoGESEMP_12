import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import boostrap_js from "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import boostrap_icons from "../node_modules/bootstrap-icons/font/bootstrap-icons.css"

Vue.use(bootstrap);
Vue.use(boostrap_js);
Vue.use(boostrap_icons)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
