<template>
  <div id="app">
    <HelloWorld />
    <DinamicComp />
    <SiteTest />
    <VueCopy />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import DinamicComp from './components/DinamicComp.vue'
import SiteTest from './components/SiteTest.vue'
import VueCopy from "@/components/VueCopy.vue";

export default {
  name: 'App',
  components: {
    VueCopy,
    HelloWorld,DinamicComp,SiteTest,
  }
}
</script>