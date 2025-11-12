<template>
  <div v-if="modalVisible" class="auth-modal" @keydown.esc="handleClose" tabindex="0">
    <div class="auth-mask" @click="handleClose"></div>
    <div class="auth-container">
      <button class="auth-close" @click="handleClose">×</button>
      <div class="auth-tabs">
        <button
          :class="['auth-tab', activeTab === 'login' ? 'active' : '']"
          @click="switchTo('login')"
        >
          登录
        </button>
        <button
          :class="['auth-tab', activeTab === 'register' ? 'active' : '']"
          @click="switchTo('register')"
        >
          注册
        </button>
      </div>

      <div class="auth-content">
        <form v-if="activeTab === 'login'" @submit.prevent="onLogin">
          <div class="form-item">
            <label>邮箱</label>
            <input v-model.trim="loginForm.email" type="email" placeholder="请输入邮箱" required />
          </div>
          <div class="form-item">
            <label>密码</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="请输入密码" required />
          </div>
          <button class="primary" type="submit">登录</button>
        </form>

        <form v-else @submit.prevent="onRegister">
          <div class="form-item">
            <label>邮箱</label>
            <input v-model.trim="registerForm.email" type="email" placeholder="请输入邮箱" required />
          </div>
          <div class="form-item">
            <label>密码</label>
            <input v-model.trim="registerForm.password" type="password" placeholder="设置密码" required />
          </div>
          <div class="form-item">
            <label>确认密码</label>
            <input v-model.trim="registerForm.confirmPassword" type="password" placeholder="再次输入密码" required />
          </div>
          <button class="primary" type="submit">注册</button>
        </form>
      </div>
    </div>
  </div>
  </template>

<script>
export default {
  name: "AuthModal",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    modalVisible() {
      return this.$store.state.auth && this.$store.state.auth.modalVisible;
    },
    activeTab() {
      return (this.$store.state.auth && this.$store.state.auth.activeTab) || "login";
    },
  },
  mounted() {
    if (this.modalVisible) {
      this.focusContainer();
    }
  },
  watch: {
    modalVisible(visible) {
      if (visible) {
        this.focusContainer();
      }
    },
  },
  methods: {
    focusContainer() {
      this.$nextTick(() => {
        const el = this.$el;
        if (el && el.focus) el.focus();
      });
    },
    handleClose() {
      this.$store.dispatch("auth/close");
      this.$emit("close");
    },
    switchTo(tab) {
      this.$store.dispatch("auth/switchTo", tab);
    },
    async onLogin() {
      // 在此处对接实际登录逻辑（API 调用 / 校验等）
      this.$emit("login", { ...this.loginForm });
      this.$store.dispatch("auth/close");
    },
    async onRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert("两次输入的密码不一致");
        return;
      }
      // 在此处对接实际注册逻辑
      this.$emit("register", { email: this.registerForm.email });
      this.$store.dispatch("auth/close");
    },
  },
};
</script>

<style scoped>
.auth-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
}
.auth-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
.auth-container {
  position: relative;
  width: 360px;
  margin: 10vh auto 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  padding: 20px 22px 24px;
}
.auth-close {
  position: absolute;
  right: 8px;
  top: 6px;
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
}
.auth-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.auth-tab {
  flex: 1;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fafafa;
  cursor: pointer;
}
.auth-tab.active {
  color: #fff;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(59, 45, 72, 0.95) 100%);
  border-color: transparent;
}
.auth-content {
  text-align: left;
}
.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
.form-item label {
  font-size: 14px;
  color: #333;
}
.form-item input {
  height: 38px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
button.primary {
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(59, 45, 72, 0.95) 100%);
}
</style>


