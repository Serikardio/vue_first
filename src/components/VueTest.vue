<template>
  <div>
<!--    {{filltag}}-->
    <div>
      <div class="">
      <div>Section: {{filltag.section}}</div>
      <div>Name: {{ filltag.name}}</div>
      <button @click="Olegindastris" >x</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    filltag: {
      type: Object,
      required: true,
    },
  },
  data() {
    return{

    };
  },
  methods: {
    Olegindastris(){
      this.$emit("TagDetails", this.filltag.id);
    }
  },
};
</script>