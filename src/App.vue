<template>
  <div id="app" class="flex">
    <VueCopy />
    <VueTest />
  </div>
</template>

<script>
import VueCopy from "@/components/VueCopy.vue";
import VueTest from "@/components/VueTest.vue";

export default {
  components: {
    VueTest,
    VueCopy,
  },
  data() {
    return {

    };
  },
}

</script>