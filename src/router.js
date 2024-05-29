import Vue from 'vue';
import Router from 'vue-router';
import VueCopy from "@/components/VueCopy.vue";
import TagInfo from "@/components/TagInfo.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: VueCopy,
      children: [
          {
          path: '/task/:id/',
          name: 'task',
          component: TagInfo,
          meta: { modal: true }
        }
      ]
    },

  ]
});
