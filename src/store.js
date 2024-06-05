import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataToPass: '' // Инициализация данных для передачи
  },
  mutations: {
    setData(state, payload) {
      state.dataToPass = payload;
    }
  },
  actions: {
    updateData({ commit }, payload) {
      commit('setData', payload);
    }
  },
  getters: {
    getData: state => state.dataToPass
  }
});
