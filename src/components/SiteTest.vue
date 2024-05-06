<template>
    <div>
        <div v-for="number in more" :key="number">{{ number }}</div>
        <div class="mx-4">{{ umnozhit }}</div>
        <div>{{ summ }}</div>
        <div v-for="number in moreThan5" :key="number">{{ number }}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      numbers: [1,2,3,4,5,6,7,8,9,10],
      numbersHight: []
    };
  },
  mounted(){
    this.numbersHight();
  },
//   computed: {
//     more() {
//       return this.numbers.filter(item => item > 5);
//     },
//     umnozhit() {
//       return this.numbers.map(item => item * 3);
//     },
//     summ() {
//       return this.numbers.reduce((acc, item ) => acc + item , 0);
//     },
// }
methods: {
    moreThan5(){
        for(let i = 0; i < this.numbers.lenght; i++){
            if (this.numbers[i] > 5){
                this.numbersHight.push(this.numbers[i]);
            }
        }
    }
  }
};
</script>