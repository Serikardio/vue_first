import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCopy from "@/components/VueCopy.vue";
import TagInfo from "@/components/TagInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'TodoApp',
    component: VueCopy
  },
  {
    path: '/info/:id',
    name: 'ModalInfo',
    component: TagInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
