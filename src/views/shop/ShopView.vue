<template>
  <div class="app">
    <header>
      <div class="logo">
        <h1>
          <a href=""
            ><img
              :src="getWebPImage(require('@/assets/images/logo.jpg'))"
              alt=""
          /></a>
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
    <div class="wrapper">
      <div class="top">
        <ul>
          <li v-for="category in categories" :key="category">
            <a href="">{{ category }}</a>
          </li>
        </ul>
      </div>
      <div class="show">
        <div class="subnav">
          <div class="title">
            <span class="iconfont icon-dishini"></span>
            <h4>迪士尼IP系列</h4>
          </div>
          <div class="IP">
            <ul>
              <a href="" v-for="series in ipSeries" :key="series">
                <li>
                  {{ series }}<span class="iconfont icon-jiantou2"></span>
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div class="slider">
          <div class="slider-container">
            <img
              v-for="(img, index) in sliderImages"
              :key="index"
              :src="img.src"
              :class="{ active: index === currentSliderIndex }"
              alt=""
            />
          </div>
          <div class="slider-dots">
            <div
              v-for="(img, index) in sliderImages"
              :key="index"
              class="slider-dot"
              :class="{ active: currentSliderIndex === index }"
              @click="goToSlider(index)"
            ></div>
          </div>
          <div class="slider-btn prev" @click="prevSlider">❮</div>
          <div class="slider-btn next" @click="nextSlider">❯</div>
        </div>
      </div>
      <div class="key">
        <ul>
          <li v-for="key in keyNav" :key="key">
            <a href=""
              ><div class="box">
                <h5>{{ key }}</h5>
              </div></a
            >
          </li>
        </ul>
      </div>
      <div class="soft">
        <div class="title">
          <h2>毛绒玩具</h2>
          <a href="">more ></a>
        </div>
        <div class="display">
          <div class="products-wrapper">
            <ul class="left-grid">
              <li
                v-for="product in softToys"
                :key="product.id"
                class="product-card"
              >
                <div class="product-image">
                  <img :src="product.image" />
                </div>
                <div class="product-info">
                  <h3 class="product-title">{{ product.title }}</h3>
                  <p class="product-description">{{ product.description }}</p>
                  <div class="product-price">
                    ¥{{ product.price.toFixed(2) }}
                  </div>
                  <div class="button-container">
                    <button class="cart-button" @click="addToCart(product)">
                      <i class="iconfont icon-shopshoppingco"></i>
                    </button>
                    <button class="buy-button" @click="buyNow(product)">
                      <i class="iconfont icon-pay"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="featured-product">
              <div class="product-image">
                <img :src="featuredSoftToy.image" alt="" />
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ featuredSoftToy.title }}</h3>
                <p class="product-description">
                  {{ featuredSoftToy.description }}
                </p>
                <div class="product-price">
                  ¥{{ featuredSoftToy.price.toFixed(2) }}
                </div>
                <div class="button-container">
                  <button
                    class="cart-button"
                    @click="addToCart(featuredSoftToy)"
                  >
                    <i class="iconfont icon-shopshoppingco"></i>
                  </button>
                  <button class="buy-button" @click="buyNow(featuredSoftToy)">
                    <i class="iconfont icon-shopshoppingco"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="der">
        <div class="title">
          <h2>饰品</h2>
          <a href="">more ></a>
        </div>
        <div class="display">
          <div class="product-container">
            <div
              v-for="item in accessories"
              :key="item.id"
              class="product-item"
            >
              <img :src="item.image" :alt="'Product ' + item.id" />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="title">
          <h2>盲盒</h2>
          <a href="">more ></a>
        </div>
        <div class="display">
          <div class="blind-box-container">
            <!-- 特色盲盒 -->
            <div class="featured-box">
              <div class="product-image">
                <img :src="blindBox.featured.image" alt="限定盲盒" />
              </div>
              <div class="product-info">
                <h3>{{ blindBox.featured.title }}</h3>
                <p>{{ blindBox.featured.description }}</p>
                <div class="price">
                  ¥{{ blindBox.featured.price.toFixed(2) }}
                </div>
                <div class="button-container">
                  <button
                    class="cart-button"
                    @click="addToCart(blindBox.featured)"
                  >
                    <i class="iconfont icon-shopshoppingco"></i>
                  </button>
                  <button class="buy-button" @click="buyNow(blindBox.featured)">
                    <i class="iconfont icon-pay"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- 小盲盒 -->
            <div class="box-grid">
              <div
                v-for="box in blindBox.miniBoxes"
                :key="box.id"
                class="mini-box"
              >
                <img :src="box.image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomest">
      <div class="policy">
        <ul>
          <li><a href="">隐私政策</a></li>
          <li>|</li>
          <li><a href="">退换货政策</a></li>
          <li>|</li>
          <li><a href="">售后服务</a></li>
        </ul>
      </div>
      <div class="end">
        <dl>
          <dt>选购指南</dt>
          <dd v-for="link in footerLinks.guide" :key="link">
            <a href="">{{ link }}</a>
          </dd>
        </dl>
        <dl>
          <dt>服务中心</dt>
          <dd v-for="link in footerLinks.service" :key="link">
            <a href="">{{ link }}</a>
          </dd>
        </dl>
        <dl>
          <dt>关于迪士尼</dt>
          <dd v-for="link in footerLinks.about" :key="link">
            <a href="">{{ link }}</a>
          </dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd v-for="link in footerLinks.follow" :key="link">
            <a href="">{{ link }}</a>
          </dd>
        </dl>
      </div>
    </div>
    <br /><br />

    <!-- <footer align="center">
        <p>&copy;2307黄恭祖</p>
    <script src="./index.js"></script>
    <script src="./HappyImage.min.js"></script>
    <script src="./jquery.min.js"></script> -->

    <div class="side-nav">
      <ul>
        <li>
          <i class="nav-icon phone-icon"></i>
          <span>手机APP</span>
        </li>
        <li>
          <i class="nav-icon user-icon"></i>
          <span>个人中心</span>
        </li>
        <li>
          <i class="nav-icon service-icon"></i>
          <span>售后服务</span>
        </li>
        <li>
          <i class="nav-icon customer-icon"></i>
          <span>人工客服</span>
        </li>
        <li>
          <i class="nav-icon cart-icon"></i>
          <span>购物车</span>
        </li>
        <li>
          <i class="nav-icon return-icon"></i>
          <span><a href="#" @click="scrollToTop">回顶部</a></span>
        </li>
      </ul>
    </div>
    <!-- <script src="./js/index.js"></script> -->
  </div>
</template>

<script>
import webpMixin from "@/utils/webpMixin";

export default {
  name: "ShopView",
  mixins: [webpMixin],
  data() {
    return {
      // 导航菜单
      navMenu: [
        { name: "首页", path: "/" },
        { name: "乐园资讯", path: "/news" },
        { name: "相关影视", path: "/movies" },
        { name: "周边商城", path: "/shop" },
      ],

      // 分类菜单（顶部）
      categories: [
        "毛绒玩具",
        "文具",
        "服装",
        "饰品",
        "家具用品",
        "收藏品",
        "会员中心",
        "购物车",
        "客服",
      ],

      // IP系列列表
      ipSeries: [
        "米奇米妮系列",
        "冰雪奇缘系列",
        "星球大战系列",
        "疯狂动物城系列",
        "漫威系列",
        "维尼小熊系列",
      ],

      // 轮播图数据
      sliderImages: [],
      currentSliderIndex: 0, // 当前轮播图索引
      autoPlayTimer: null, // 自动播放定时器

      // 毛绒玩具商品列表
      softToys: [
        {
          id: 1,
          image: null,
          title: "樱花物语",
          description: "官方史迪仔毛绒公仔",
          price: 199.0,
        },
        {
          id: 2,
          image: null,
          title: "甜心早餐",
          description: "维尼草莓熊毛绒玩偶",
          price: 199.0,
        },
        {
          id: 3,
          image: null,
          title: "雪人系列",
          description: "迪士尼雪人毛绒玩偶",
          price: 129.0,
        },
        {
          id: 4,
          image: null,
          title: "睡衣系列",
          description: "玲娜贝儿毛绒玩偶",
          price: 219.0,
        },
      ],

      // 特色商品（毛绒玩具的大商品）
      featuredSoftToy: {
        image: null,
        title: "畅销商品",
        description: "疯狂动物城尼克朱迪开心公仔一米毛绒玩偶",
        price: 399.0,
      },

      // 饰品图片列表
      accessories: [
        { id: 1, image: null },
        { id: 2, image: null },
        { id: 3, image: null },
      ],

      // 盲盒商品
      blindBox: {
        featured: {
          image: null,
          title: "TOP TOY搞怪日记系列手办盲盒",
          description: "迪士尼史迪奇搞怪日记盲盒玩具一套（6常规＋1隐藏）",
          price: 394.0,
        },
        miniBoxes: [
          { id: 1, image: null },
          { id: 2, image: null },
          { id: 3, image: null },
          { id: 4, image: null },
          { id: 5, image: null },
          { id: 6, image: null },
          { id: 7, image: null },
          { id: 8, image: null },
        ],
      },

      // 关键词导航
      keyNav: ["热门商品", "主题活动", "品牌故事", "限定周边"],

      // 底部链接数据
      footerLinks: {
        guide: ["毛绒玩具", "文具", "服装", "饰品", "收藏品"],
        service: ["申请售后", "售后政策", "订单查询", "保障服务", "防伪查询"],
        about: [
          "了解迪士尼",
          "加入迪士尼",
          "投资者关系",
          "可持续发展",
          "廉洁举报",
        ],
        follow: ["新浪微博", "官方微信", "联系我们", "公益基金"],
      },
    };
  },
  methods: {
    // 轮播图：下一张
    nextSlider() {
      this.currentSliderIndex =
        (this.currentSliderIndex + 1) % this.sliderImages.length;
    },

    // 轮播图：上一张
    prevSlider() {
      this.currentSliderIndex =
        (this.currentSliderIndex - 1 + this.sliderImages.length) %
        this.sliderImages.length;
    },

    // 轮播图：切换到指定索引
    goToSlider(index) {
      this.currentSliderIndex = index;
    },

    // 添加到购物车
    addToCart(product) {
      console.log("添加到购物车:", product);
      // 这里添加购物车逻辑
    },

    // 立即购买
    buyNow(product) {
      console.log("立即购买:", product);
      // 这里添加购买逻辑
    },

    // 回顶部
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // 初始化所有图片（使用 WebP 优化）
    initImages() {
      // 轮播图
      this.sliderImages = [
        {
          src: this.getWebPImage(
            require("@/assets/images/goods/soft（1）.png")
          ),
        },
        {
          src: this.getWebPImage(require("@/assets/images/goods/soft (2).png")),
        },
        {
          src: this.getWebPImage(require("@/assets/images/goods/soft (3).png")),
        },
        {
          src: this.getWebPImage(
            require("@/assets/images/goods/soft（4）.png")
          ),
        },
      ];

      // 毛绒玩具
      this.softToys[0].image = this.getWebPImage(
        require("@/assets/images/goods/soft（1）.png")
      );
      this.softToys[1].image = this.getWebPImage(
        require("@/assets/images/goods/soft (2).png")
      );
      this.softToys[2].image = this.getWebPImage(
        require("@/assets/images/goods/soft (3).png")
      );
      this.softToys[3].image = this.getWebPImage(
        require("@/assets/images/goods/soft（4）.png")
      );

      // 特色商品
      this.featuredSoftToy.image = this.getWebPImage(
        require("@/assets/images/goods/soft.jpg")
      );

      // 饰品
      this.accessories[0].image = this.getWebPImage(
        require("@/assets/images/goods/der1.jpg")
      );
      this.accessories[1].image = this.getWebPImage(
        require("@/assets/images/goods/der2.jpg")
      );
      this.accessories[2].image = this.getWebPImage(
        require("@/assets/images/goods/der3.jpg")
      );

      // 盲盒
      this.blindBox.featured.image = this.getWebPImage(
        require("@/assets/images/goods/main.png")
      );
      this.blindBox.miniBoxes[0].image = this.getWebPImage(
        require("@/assets/images/goods/1.png")
      );
      this.blindBox.miniBoxes[1].image = this.getWebPImage(
        require("@/assets/images/goods/2.png")
      );
      this.blindBox.miniBoxes[2].image = this.getWebPImage(
        require("@/assets/images/goods/3.jpg")
      );
      this.blindBox.miniBoxes[3].image = this.getWebPImage(
        require("@/assets/images/goods/4.jpg")
      );
      this.blindBox.miniBoxes[4].image = this.getWebPImage(
        require("@/assets/images/goods/5.jpg")
      );
      this.blindBox.miniBoxes[5].image = this.getWebPImage(
        require("@/assets/images/goods/6.jpg")
      );
      this.blindBox.miniBoxes[6].image = this.getWebPImage(
        require("@/assets/images/goods/7.jpg")
      );
      this.blindBox.miniBoxes[7].image = this.getWebPImage(
        require("@/assets/images/goods/8.jpg")
      );
    },
  },
  mounted() {
    // 初始化图片（使用 WebP 优化）
    this.initImages();

    // 启动轮播图自动播放
    this.autoPlayTimer = setInterval(() => {
      this.nextSlider();
    }, 2000);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  },
};
</script>

<style scoped>
@import "@/assets/css/base.css";
@import "@/assets/css/shop.css";
@import "@/assets/fonts/iconfont/iconfont.css";
</style>
