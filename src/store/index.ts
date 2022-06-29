import { createStore } from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'


export default createStore({
  state: {
    routes:[]
  },
  getters: {
  },
  mutations: {
    initRoutes(state, data){
      state.routes = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
