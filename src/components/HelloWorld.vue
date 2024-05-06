<template>
   <div class="flex items-center justify-center">
      <div class="flex items-center border rounded bg-gray-50 p-4">
         <!-- v-bind == :    -->
         <p class="" :style="{ textDecoration: textDecoration }">life is line</p>
         <!-- v-on == @      -->
         <button class="w-4 h-4 border ml-4 flex justify-center items-center" @click="toggleTextDecoration">X</button>
      </div>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       textDecoration: 'none',
       isTextDecorated: false
     };
   },
   methods: {
     toggleTextDecoration() {
       this.isTextDecorated = !this.isTextDecorated;
 
       if (this.isTextDecorated) {
         this.textDecoration = 'line-through';
       } else {
         this.textDecoration = 'none';
       }
     }
   }
 };
 </script>
 