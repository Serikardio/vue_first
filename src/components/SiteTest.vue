<template>
    <div class="flex flex-col">
        <div class="mx-4">{{ umnozhit }}</div>
        <div class="">{{ summ }}</div>
        <div>{{ more }}</div>

        <div>
            <input class="border" v-model="inputNumber" @input="Text_rus" type="number">
            <p v-if="convertedWord">Число "{{ inputNumber }}", т.e "{{ convertedWord }}"</p>
        </div>
        <div></div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      numbers: [1,2,3,4,5,6,7,8,9,10],
      num_rus: ['Один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'],
      inputNumber:'',
      convertedWord:''
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
        let sum = 0;
        for (let i = 0; i < this.numbers.length; i++) {
            sum += this.numbers[i];
        }
    return sum;

    //   return this.numbers.reduce((acc, item ) => acc + item , 0);
    },
    // %2
},

created(){
    // this.Num()
},

methods: {
    Text_rus(){
        const index = this.numbers.indexOf(parseInt(this.inputNumber));
        if (index !== -1){
            this.convertedWord = this.num_rus[index];
        } else{
            this.convertedWord = '';
        }
    }
  }
};
</script>