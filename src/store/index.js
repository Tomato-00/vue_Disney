import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: {
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
    },
  },
});
