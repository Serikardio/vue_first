<template>
    <div class="flex flex-col">

        <div v-for="number in more" :key="number">{{ number }}</div>
        <div class="mx-4">{{ umnozhit }}</div>
        <div class="">{{ summ }}</div>


        <div class="" v-for="(number) in filtredNums" :key="number">{{ number }}</div>
        <div>{{ more }}</div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      numbers: [1,2,3,4,5,6,7,8,9,10],
      sum: 0,
    };
  },
  computed: {
    more() {

        const res = [];

        for (let i = 0; i < this.numbers.length; i++){
            if (this.numbers[i] > 5) {res.push(this.numbers[i]);}
        }

        return res;

    //   return this.numbers.filter(item => item > 5);
    },
    umnozhit() {
        const res = [];
        for (let i = 0; i < this.numbers.length; i++){
            res.push(this.numbers[i] * 3);
        }
        return res;
        },

    //   return this.numbers.map(item => item * 3);
    summ() {
        const res = [];
        let sum = 0;

        for (let i = 0; i < this.numbers.length; i++) {
            sum += this.numbers[i];
            res.push(sum);
        }
    return res;

    //   return this.numbers.reduce((acc, item ) => acc + item , 0);
    },
},

created(){
    // this.Num()
},

methods: {
  }

};
</script>