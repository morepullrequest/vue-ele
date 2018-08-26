import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import goods from "./views/goods.vue";
import ratings from "./views/ratings.vue";
import seller from "./views/seller.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
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
