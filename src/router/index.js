import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

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
    meta: {
      requiresAuth: true,
    },
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (!requiresAuth) {
    next();
    return;
  }

  const isAuthed = store.getters["user/isAuthed"];
  if (isAuthed) {
    next();
    return;
  }

  store.dispatch("auth/open", "login");
  next(false);
});

export default router;
