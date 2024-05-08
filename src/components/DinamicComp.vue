<template>
    <div class="w-full h-auto" >
        <div class="flex items-center justify-between border-b-2">
            <button
            @click="Selected('b1')"
            class="font-lg text-lg focus:border-b-2 focus:border-red-500">
                Dynamic
            </button>
            <button
            @click="Selected('b2')"
            class="font-lg text-lg focus:border-b-2 focus:border-red-500">
                Self
            </button>
            <button
            @click="Selected('b3')"
            class="font-lg text-lg focus:border-b-2 w-10 focus:border-red-500">
                Care
            </button>
        </div>
        <div class="flex w-full" v-show="show['b1']">
            <div>
                oleg 
            </div>
            <div>
                petrov
            </div>
            <div>
                smirnow
            </div>
            <div>
                И я
            </div>
        </div>
        <div class="flex w-full" v-show="show['b2']">
            <p>BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</p>
        </div>
        <div class="flex w-full" v-show="show['b3']">
            <p>zzzzzzzzzzzzzzzzzzzzzZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ</p>
        </div>
    </div>
</template>

<script>
import SiteTest from './SiteTest.vue';

export default{
    comments:{
        SiteTest,
    },
    data(){
        return{
            show:{
                b1: false,
                b2: false,
                b3: false
            }
        };
    },
    methods: {
        Selected( name ){
            this.show = { ...this.show, [name]: true};

            for(let b in this.show){
                if (b !== name ){
                    this.show[b] = false;
                }
            }
        }
    }
}
</script>