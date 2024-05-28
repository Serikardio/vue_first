import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCopy from "@/components/VueCopy.vue";
import TagInfo from "@/components/TagInfo.vue";

Vue.use(VueRouter);

const routes = [
  { path: '/', component: VueCopy },
  { path: '/one', component: TagInfo },
];

const router = new VueRouter({
  mode: 'hash', // Использование хэш-режима
  routes,
});

export default router;
