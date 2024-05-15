<template>
    <div class="flex flex-col">
        <div class="mx-4">{{ umnozhit }}</div>
        <div class="">{{ summ }}</div>
        <div>{{ more }}</div>

        <div>
            <input class="border" v-model="inputNumber" @input="Text_rus" type="number">
            <p v-if="convertedWord">Число "{{ inputNumber }}", т.e "{{ convertedWord }}"</p>
        </div>
        <div>{{ ltt }}</div>
        <div>{{ Text_rus_stroke }}</div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      numbers: [1,2,3,4,5,6,7,8,9,10],
      num_rus: ['Один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'],
      num_rus_simple: {
        "1": "Один",
        "2":"Двa",
        // ...
      },
      inputNumber:'',
      convertedWord:'',
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
    ltt(){
        const res = [];
        for (let i = 0; i < this.numbers.length; i++){
            if (this.numbers[i] % 2 == 0) {res.push(this.numbers[i]);}
        }

        return res;
    },

    Text_rus_stroke() {
    return this.ltt.reduce((obj, char) => {
        const index = this.numbers.indexOf(parseInt(char));
        if (index !== -1) {
            obj[this.numbers[index]] = this.num_rus[index];
        }
        return obj;
    }, {});
},



//     Text_rus_stroke() {
//         let obj = {};

//         for (let i = 0; i < this.ltt.length; i++) {
//             const index = this.numbers.indexOf(parseInt(this.ltt[i]));
//             if (index !== -1) {
//                 obj[this.numbers[index]] = this.num_rus[index];
//             }
//         }
//         return obj;
// },



//     Text_rus_stroke() {
//     const res = [];
//     for (let i = 0; i < this.ltt.length; i++) {
//         const index = this.numbers.indexOf(parseInt(this.ltt[i]));
//         if (index !== -1) {
//             res.push( this.numbers[index], this.num_rus[index] );
//         }
//     }
//     return res;
// }
    
},

created(){
    // this.Num()
},

mounted() {
        this.Text_rus_stroke(); // Вызываем метод Text_rus при загрузке страницы
    },
methods: {
    Text_rus(){
        const index = this.numbers.indexOf(parseInt(this.inputNumber));
        if (index !== -1){
            this.convertedWord = this.num_rus[index];
        } else{
            this.convertedWord = '';
        }
    },
  }
};
</script>