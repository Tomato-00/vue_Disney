import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Shop",
    component: () =>
      import(/* webpackChunkName: "shop" */ "@/views/shop/ShopView.vue"),
  },
  {
    path: "/shop",
    name: "ShopAlias",
    component: () =>
      import(/* webpackChunkName: "shop" */ "@/views/shop/ShopView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
