import { defineStore } from 'pinia'

export const useSecurityStore = defineStore('securityStore', {
  state: () => ({
    role: "",
    user: null,
    keycloak: null,
  }),

  getters: {
  },

  actions: {
    setRole(role) {
      this.role = role;
    },

    setUser(user) {
      this.user = user;
    },

    setKeycloak(kc) {
      this.keycloak = kc;
    },
  }
})
