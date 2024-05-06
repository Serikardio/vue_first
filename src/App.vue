<template>
  <div id="app">
    <HelloWorld />
    <DinamicComp />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import DinamicComp from './components/DinamicComp.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,DinamicComp,
  }
}
</script>