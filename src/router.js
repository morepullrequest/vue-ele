import Vue from "vue";
import Router from "vue-router";

import goods from "./views/goods/goods.vue";
import ratings from "./views/ratings/ratings.vue";
import seller from "./views/seller/seller.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "/goods"
    },
    {
      path: "/goods",
      name: "goods",
      component: goods
    },
    {
      path: "/ratings",
      name: "ratings",
      component: ratings
    },
    {
      path: "/seller",
      name: "seller",
      component: seller
    }
  ]
});
