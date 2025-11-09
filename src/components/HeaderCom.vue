<template>
  <header>
    <div class="logo">
      <h1>
        <a href="">
          <img
            :src="getWebPImage(require('@/assets/images/logo.jpg'))"
            alt=""
          />
        </a>
      </h1>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in navMenu" :key="item.name">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="search">
      <input type="text" placeholder="search" />
      <a href=""><span class="iconfont icon-sousuo"></span></a>
      <a href="./注册.html" target="_blank"><button>注册</button></a>
      <button>登录</button>
    </div>
  </header>
</template>

<script>
import webpMixin from "@/utils/webpMixin";

export default {
  name: "HeaderCom",
  mixins: [webpMixin],
  props: {
    navMenu: {
      type: Array,
      default: () => [
        { name: "首页", path: "/" },
        { name: "乐园资讯", path: "/news" },
        { name: "相关影视", path: "/movies" },
        { name: "周边商城", path: "/shop" },
      ],
    },
  },
};
</script>

<style scoped>
@import "@/assets/fonts/iconfont/iconfont.css";
header {
  height: 60px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(59, 45, 72, 0.95) 100%
  );
  display: flex;
  padding: 0 20px;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo img {
  height: 60px;
  width: 120px;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05);
}

.list ul {
  width: 750px;
  display: flex;
  margin-left: 20px;
}

.list ul li {
  width: 100px;
  height: 60px;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list li a {
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  padding: 8px 15px;
  border-radius: 20px;
  position: relative;
}

.list li a:hover {
  color: aqua;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.list li a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: aqua;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.list li a:hover::after {
  width: 80%;
}

.search {
  width: 500px;
  margin-left: 200px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.search input {
  width: 250px;
  height: 30px;
  border-radius: 30px;
  padding-left: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;
}

.search input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}

.search input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search button {
  padding: 6px 15px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search button:hover {
  background: aqua;
  transform: translateY(-2px);
}

.search a {
  color: #fff;
  font-size: 14px;
}
</style>
