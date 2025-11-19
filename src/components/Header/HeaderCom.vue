<template>
  <div class="header-wrapper">
    <header class="shop-header">
      <div class="header-container">
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

          <nav class="primary-nav" aria-label="主导航">
            <ul>
              <li v-for="item in navItems" :key="item.label">
                <router-link
                  v-if="item.to"
                  :to="item.to"
                  class="nav-link"
                  :exact="item.exact !== false"
                  exact-active-class="active"
                >
                  {{ item.label }}
                </router-link>
                <a
                  v-else
                  :href="item.href"
                  :target="item.target"
                  :rel="item.rel"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </nav>

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
            <div class="drawer-title">导航菜单</div>
          </div>
          <ul>
            <li v-for="item in navItems" :key="item.label">
              <router-link
                v-if="item.to"
                :to="item.to"
                class="category-link"
                @click="closeMobileMenu"
              >
                {{ item.label }}
              </router-link>
              <a
                v-else
                :href="item.href"
                :target="item.target"
                :rel="item.rel"
                class="category-link"
                @click="closeMobileMenu"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="header-spacer"></div>

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
    navItems: {
      type: Array,
      default: () => [
        { label: "首页", to: "/" },
        { label: "乐园资讯", to: "/news" },
        { label: "相关影视", to: "/tv" },
        { label: "周边商城", to: "/shop" },
      ],
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

<style scoped>
@import "@/assets/fonts/iconfont/iconfont.css";

.header-wrapper {
  position: relative;
  width: 100%;
  --header-height: 148px;
}

.header-spacer {
  height: var(--header-height);
  pointer-events: none;
}

.shop-header {
  min-height: 74px;
  background: linear-gradient(135deg, rgba(20, 16, 32, 0.96) 0%, rgba(44, 32, 65, 0.98) 52%, rgba(18, 12, 28, 0.96) 100%);
  display: flex;
  flex-direction: column;
  padding: 18px 0 20px;
  gap: 18px;
  box-shadow: 0 14px 32px -18px rgba(10, 5, 20, 0.8), inset 0 -1px 0 rgba(255, 255, 255, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  width: 100%;
  overflow: hidden;
}

.shop-header::before,
.shop-header::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.shop-header::before {
  left: 0;
  background: linear-gradient(90deg, rgba(5, 3, 12, 0.85) 0%, rgba(5, 3, 12, 0) 100%);
}

.shop-header::after {
  right: 0;
  background: linear-gradient(270deg, rgba(5, 3, 12, 0.85) 0%, rgba(5, 3, 12, 0) 100%);
}

.header-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  /* background-color: yellow; */
}

.shop-header .header-main {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 36px;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-toggle span {
  width: 18px;
  height: 2px;
  background: #fff;
  border-radius: 999px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.menu-toggle:hover {
  transform: translateY(-2px);
}

.shop-header .logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  line-height: 0;
  margin-top: 10px;
  margin-left: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease,
    transform 0.3s ease;
}

.shop-header .logo:hover {
  border-color: rgba(0, 255, 255, 0.8);
  background: rgba(0, 255, 255, 0.08);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
  transform: translateY(-2px);
}

.shop-header .logo img {
  display: block;
  height: 56px;
  width: auto;
  border-radius: 999px;
}

@media screen and (max-width: 1200px) {
  .header-wrapper {
    --header-height: 168px;
  }
}

@media screen and (max-width: 992px) {
  .header-wrapper {
    --header-height: 210px;
  }
}

@media screen and (max-width: 768px) {
  .header-wrapper {
    --header-height: 120px;
  }
}

.primary-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
}

.primary-nav ul {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.primary-nav li {
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary-nav a {
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 14px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.primary-nav a::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background: aqua;
  transition: width 0.3s ease, transform 0.3s ease;
  transform: translateX(-50%);
}

.primary-nav a:hover {
  color: aqua;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.primary-nav a:hover::after,
.primary-nav a.active::after {
  width: 80%;
}

.primary-nav a.active {
  color: aqua;
}

.shop-header .search-bar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  flex: 0 0 260px;
  max-width: 300px;
}

.shop-header .search-bar input {
  flex: 1;
  min-width: 0;
  height: 34px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 14px;
  padding-right: 36px;
}

.shop-header .search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.shop-header .search-bar input:focus {
  outline: none;
}

.shop-header .search-bar .search-trigger {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shop-header .search-bar .search-trigger:hover {
  color: aqua;
  background: rgba(255, 255, 255, 0.12);
}

.shop-header .search-bar .search-trigger .iconfont {
  font-size: 16px;
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 8px;
}

.auth-actions .auth-btn {
  padding: 6px 12px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-actions .auth-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  border-color: rgba(0, 255, 255, 0.6);
}

.auth-actions .auth-btn.register {
  border-style: dashed;
}

.list {
  width: 100%;
  display: none;
}

.header-container .list {
  margin-top: -4px;
}

.list ul {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0;
  padding: 0;
  justify-content: center;
}

.list ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  min-width: 64px;
}

.list li a,
.list li .category-link {
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  padding: 6px 12px;
  border-radius: 20px;
  position: relative;
}

.list li .category-link {
  border: none;
  background: transparent;
  font: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.list li .category-link:focus {
  outline: none;
}

.list li a:hover,
.list li .category-link:hover {
  color: aqua;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.list li a::after,
.list li .category-link::after {
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

.list li a:hover::after,
.list li .category-link:hover::after {
  width: 80%;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
  backdrop-filter: blur(2px);
}

@media screen and (max-width: 1200px) {
  .shop-header {
    padding: 16px 0 18px;
  }

  .header-container {
    padding: 0 24px;
    gap: 16px;
  }

  .shop-header .logo img {
    height: 48px;
  }
}

@media screen and (max-width: 992px) {
  .header-container {
    padding: 0 20px;
  }

  .shop-header .header-main {
    flex-wrap: wrap;
    gap: 16px;
  }

  .shop-header .list {
    display: flex;
  }

  .primary-nav {
    order: 4;
    width: 100%;
    justify-content: center;
    padding-top: 8px;
  }

  .primary-nav ul {
    gap: 18px;
  }

  .shop-header .logo {
    order: 1;
    padding-right: 6px;
  }

  .shop-header .logo img {
    height: 44px;
  }

  .shop-header .search-bar {
    order: 2;
    width: 100%;
    flex: 1 1 100%;
    max-width: none;
  }

  .auth-actions {
    order: 3;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .shop-header {
    padding: 12px 0 16px;
    gap: 8px;
  }

  .header-container {
    padding: 0 8px;
    gap: 8px;
  }

  .primary-nav {
    display: none;
  }

  .shop-header .header-main {
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    overflow: hidden;
  }

  .menu-toggle {
    display: flex;
    order: 1;
    width: auto;
    height: auto;
    padding: 6px;
    flex-shrink: 0;
  }

  .shop-header .logo {
    display: none;
  }

  .shop-header .search-bar {
    order: 2;
    flex: 1;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.18);
    margin: 10px 4px;
    min-width: 0;
    max-width: calc(100% - 180px);
  }

  .auth-actions {
    order: 3;
    width: auto !important;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start !important;
    gap: 4px;
    flex-shrink: 0;
    margin-left: 20px;
    padding-left: 0;
  }

  .auth-actions .auth-btn {
    flex: 0 0 auto;
    white-space: nowrap;
    padding: 4px 8px;
    font-size: 11px;
    min-width: auto;
  }

  .auth-actions .auth-btn.register {
    display: none;
  }

  .list {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(82vw, 280px);
    background: rgba(22, 15, 30, 0.96);
    border-radius: 0 0 0 24px;
    box-shadow: -4px 0 25px rgba(0, 0, 0, 0.45);
    padding: 80px 20px 24px;
    transform: translateX(110%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.35s ease, opacity 0.35s ease;
    z-index: 950;
    overflow-y: auto;
    backdrop-filter: blur(18px);
    display: flex;
    flex-direction: column;
  }

  .list.open {
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drawer-back {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 12px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    transition: background 0.25s ease, border-color 0.25s ease;
  }

  .drawer-back:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.24);
  }

  .drawer-back:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  .drawer-back-icon {
    position: relative;
    width: 12px;
    height: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .drawer-back-icon::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-left: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: translateX(1px) rotate(45deg);
  }

  .drawer-title {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
  }

  .drawer-back-text {
    letter-spacing: 1px;
  }

  .list ul {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    align-items: stretch;
  }

  .list ul li {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
  }

  .list li a,
  .list li .category-link {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    padding: 12px 18px;
    border-radius: 14px;
    font-size: 15px;
    gap: 10px;
  }
}
</style>

