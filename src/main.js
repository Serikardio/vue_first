import Vue from 'vue';
import App from './App.vue';
import "./assets/tailwind.css";
import router from './router'; // Импорт маршрутизатора

Vue.config.productionTip = false;

new Vue({
  router, // Использование маршрутизатора
  render: h => h(App),
}).$mount('#app');
