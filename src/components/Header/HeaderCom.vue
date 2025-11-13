<template>
  <div class="header-wrapper">
    <header class="shop-header">
      <div class="header-main">
        <button
          class="menu-toggle"
          :class="{ active: isMobileMenuOpen }"
          type="button"
          aria-label="Toggle navigation"
          :aria-expanded="isMobileMenuOpen.toString()"
          aria-controls="shop-categories"
          @click="toggleMobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <router-link to="/" class="logo" aria-label="返回首页">
          <img v-if="logoImage" :src="logoImage" alt="Disney 商城" />
        </router-link>

        <div class="search-bar">
          <input
            v-model="localKeyword"
            type="text"
            :placeholder="searchPlaceholder"
            aria-label="搜索商品或品牌"
            @keyup.enter="handleSearch"
          />
          <button
            class="search-trigger"
            type="button"
            aria-label="搜索"
            @click="handleSearch"
          >
            <span class="iconfont icon-sousuo"></span>
          </button>
        </div>

        <div class="auth-actions">
          <button class="auth-btn login" type="button" @click="handleLogin">
            登录
          </button>
          <button
            v-if="showRegister"
            class="auth-btn register"
            type="button"
            @click="handleRegister"
          >
            注册
          </button>
        </div>
      </div>

      <div
        id="shop-categories"
        class="list"
        :class="{ open: isMobileMenuOpen }"
        role="navigation"
        aria-label="商品分类"
      >
        <div class="drawer-header">
          <button
            type="button"
            class="drawer-back"
            aria-label="关闭分类菜单"
            @click="closeMobileMenu"
          >
            <span class="drawer-back-icon" aria-hidden="true"></span>
            <span class="drawer-back-text">返回</span>
          </button>
          <div class="drawer-title">全部分类</div>
        </div>
        <ul>
          <li v-for="category in categories" :key="category">
            <button
              type="button"
              class="category-link"
              @click="handleCategoryClick(category)"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </div>
    </header>

    <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>
  </div>
</template>

<script>
export default {
  name: "HeaderCom",
  props: {
    logoImage: {
      type: String,
      default: "",
    },
    categories: {
      type: Array,
      default: () => [],
    },
    keyword: {
      type: String,
      default: "",
    },
    searchPlaceholder: {
      type: String,
      default: "搜索商品/品牌",
    },
    showRegister: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isMobileMenuOpen: false,
      localKeyword: this.keyword,
    };
  },
  watch: {
    keyword(value) {
      if (value !== this.localKeyword) {
        this.localKeyword = value;
      }
    },
    localKeyword(value) {
      this.$emit("update:keyword", value);
    },
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      this.$emit("menu-toggle", this.isMobileMenuOpen);
    },
    closeMobileMenu() {
      if (!this.isMobileMenuOpen) return;
      this.isMobileMenuOpen = false;
      this.$emit("menu-toggle", false);
    },
    handleSearch() {
      const keyword = this.localKeyword ? this.localKeyword.trim() : "";
      this.$emit("search", keyword);
    },
    handleCategoryClick(category) {
      this.$emit("category-click", category);
      this.closeMobileMenu();
    },
    handleLogin() {
      this.$emit("open-login");
    },
    handleRegister() {
      this.$emit("open-register");
    },
    closeMenu() {
      this.closeMobileMenu();
    },
  },
};
</script>

