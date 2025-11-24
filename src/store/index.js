import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mockUsers = [
  {
    id: 1,
    email: "demo@disney.com",
    password: "123456",
    nickname: "迪士尼星球",
  },
];

let mockUserId = mockUsers.length + 1;

const mockDelay = (payload, shouldReject = false, delay = 600) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(payload);
      } else {
        resolve(payload);
      }
    }, delay);
  });

const sanitizeUser = (user) => {
  const safeUser = { ...user };
  delete safeUser.password;
  return safeUser;
};

const mockLogin = ({ email, password }) => {
  const target = mockUsers.find((user) => user.email === email);
  if (!target || target.password !== password) {
    return mockDelay(new Error("邮箱或密码不正确"), true);
  }
  const profile = sanitizeUser(target);
  return mockDelay({
    token: `mock-token-${profile.id}-${Date.now()}`,
    user: profile,
  });
};

const mockRegister = ({ email, password }) => {
  const duplicated = mockUsers.some((user) => user.email === email);
  if (duplicated) {
    return mockDelay(new Error("该邮箱已注册"), true);
  }
  const nickname = email.split("@")[0] || `新用户${mockUserId}`;
  const newUser = {
    id: mockUserId++,
    email,
    password,
    nickname,
  };
  mockUsers.push(newUser);
  const profile = sanitizeUser(newUser);
  return mockDelay({
    token: `mock-token-${profile.id}-${Date.now()}`,
    user: profile,
  });
};

const mockAddToCart = (product, quantity) =>
  mockDelay(
    {
      ...product,
      quantity,
    },
    false,
    400
  );

const mockCreateOrder = (items) => {
  const totalAmount = items.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.price * qty;
  }, 0);

  return mockDelay(
    {
      orderId: `ORDER-${Date.now()}`,
      items,
      totalAmount,
      status: "paid",
      paidAt: new Date().toISOString(),
    },
    false,
    800
  );
};

const authModule = {
  namespaced: true,
  state: {
    modalVisible: false,
    activeTab: "login", // 'login' | 'register'
  },
  mutations: {
    setVisible(state, visible) {
      state.modalVisible = visible;
    },
    setActiveTab(state, tab) {
      state.activeTab = tab;
    },
  },
  actions: {
    open({ commit }, tab = "login") {
      commit("setActiveTab", tab);
      commit("setVisible", true);
    },
    close({ commit }) {
      commit("setVisible", false);
    },
    switchTo({ commit }, tab) {
      commit("setActiveTab", tab);
    },
  },
};

const userModule = {
  namespaced: true,
  state: {
    profile: null,
    token: "",
    loading: false,
    error: null,
  },
  getters: {
    isAuthed: (state) => Boolean(state.token),
    displayName: (state) =>
      (state.profile && (state.profile.nickname || state.profile.email)) || "",
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setAuth(state, { token, profile }) {
      state.token = token;
      state.profile = profile;
    },
    logout(state) {
      state.token = "";
      state.profile = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const { token, user } = await mockLogin(credentials);
        commit("setAuth", { token, profile: user });
        return user;
      } catch (error) {
        const message = error && error.message ? error.message : "登录失败";
        commit("setError", message);
        throw new Error(message);
      } finally {
        commit("setLoading", false);
      }
    },
    async register({ commit }, payload) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const { token, user } = await mockRegister(payload);
        commit("setAuth", { token, profile: user });
        return user;
      } catch (error) {
        const message = error && error.message ? error.message : "注册失败";
        commit("setError", message);
        throw new Error(message);
      } finally {
        commit("setLoading", false);
      }
    },
    logout({ commit }) {
      commit("logout");
    },
  },
};

const ordersModule = {
  namespaced: true,
  state: {
    history: [],
  },
  getters: {
    lastOrder: (state) => (state.history.length ? state.history[0] : null),
    totalOrders: (state) => state.history.length,
  },
  mutations: {
    addOrder(state, order) {
      state.history.unshift(order);
    },
  },
};

const cartModule = {
  namespaced: true,
  state: {
    items: [],
    lastAddedItemId: null,
  },
  getters: {
    itemCount: (state) =>
      state.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
  },
  mutations: {
    upsertItem(state, { product, quantity }) {
      const target = state.items.find((item) => item.id === product.id);
      if (target) {
        target.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }
      state.lastAddedItemId = product.id;
    },
    clear(state) {
      state.items = [];
      state.lastAddedItemId = null;
    },
  },
  actions: {
    async addItem({ commit }, { product, quantity = 1 }) {
      await mockAddToCart(product, quantity);
      commit("upsertItem", { product, quantity });
      return { product, quantity };
    },
    async checkout({ state, commit }) {
      if (!state.items.length) {
        throw new Error("购物车为空");
      }
      const order = await mockCreateOrder(state.items);
      commit("orders/addOrder", order, { root: true });
      commit("clear");
      return order;
    },
    async buyNow({ commit }, { product, quantity = 1 }) {
      const order = await mockCreateOrder([
        {
          ...product,
          quantity,
        },
      ]);
      commit("orders/addOrder", order, { root: true });
      return order;
    },
  },
};

export default new Vuex.Store({
  modules: {
    auth: authModule,
    user: userModule,
    cart: cartModule,
    orders: ordersModule,
  },
});
