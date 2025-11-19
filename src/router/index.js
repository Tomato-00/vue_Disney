import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Home/IndexPage.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () =>
      import(/* webpackChunkName: "news" */ "@/views/News/NewsPage.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () =>
      import(/* webpackChunkName: "shop" */ "@/views/shop/ShopView.vue"),
  },
  {
    path: "/tv",
    name: "TV",
    component: () =>
      import(/* webpackChunkName: "tv" */ "@/views/TV/TvPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
