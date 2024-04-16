import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    user: null,
    authToken: localStorage.getItem('authToken') || null,
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    getUser: (state) => state.user,
    getAuthToken: (state) => state.authToken,
  },
  actions: {
    login(authToken) {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('isLoggedIn', true);
      this.isLoggedIn = true;
      this.authToken = authToken
      // //commit('setAuthToken', authToken);
      // //commit('setLoggedIn', true);
    },
    logout() {
      // localStorage.removeItem('authToken');
      // commit('setAuthToken', null);
      // commit('setLoggedIn', false);
      // commit('setUser', null);

      localStorage.removeItem('authToken');
      localStorage.removeItem('isLoggedIn');
      this.isLoggedIn = false;
      this.authToken = null

      router.push("/")

    },
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthToken(state, token) {
      state.authToken = token;
    },
  },
  persist: true
},)

