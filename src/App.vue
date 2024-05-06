<template>
  <div id="app">
    <HelloWorld />
    <DinamicComp />
    <SiteTest />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import DinamicComp from './components/DinamicComp.vue'
import SiteTest from './components/SiteTest.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,DinamicComp,SiteTest,
  }
}
</script>