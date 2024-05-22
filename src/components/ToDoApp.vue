<template>
  <div>

    <div class="flex items-center justify-center my-10">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" viewBox="0 -0.5 25 25" fill="black">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="text-2xl font-medium">Todo App</h1>
    </div>

    <div class="flex items-center justify-center">
      <div v-if="filteredTags" style="width: 620px;" class="">
        <div v-for="(tags, section) in filteredTags" v-bind:key="section" class="section">
          <h2 class=" flex items-center font-medium my-2 text-xl">
             {{ section }}
          </h2>

          <ul>
            <li class="font-normal" v-for="tag in tags" :key="tag.id">
              <div class=" flex justify-between">
                  <div class="flex ">
  <!--                Ready-->
                <button v-if="tag.ready" @click="handleClick(tag.id)" >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 -0.5 25 25" fill="black">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>

                <button v-else @click="handleClick(tag.id)" >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 -0.5 25 25" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>

                <div class="-mt-1 flex items-center w-28">
                  <p :style="{ textDecoration: textDecoration }" >{{ tag.name }}</p>
                </div>

                </div>

                <div>
                  <button class=" hover:bg-gray-200 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="18" cy="12" r="1.5" transform="rotate(90 18 12)" fill="currentColor"/>
                    <circle cx="12" cy="12" r="1.5" transform="rotate(90 12 12)" fill="currentColor"/>
                    <circle cx="6" cy="12" r="1.5" transform="rotate(90 6 12)" fill="currentColor"/>
                    </svg>
                  </button>
                </div>

              </div>
            </li>
          </ul>
          </div>
        <div >
            <div class="flex items-center ">
              <input :value="new_name" class="border rounded flex items-center px-2" placeholder="Name">
              <button v-on:click="addTag"
                      class="flex items-center justify-center mx-0.5 w-20 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700">
                Create
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["selectedID","filteredTags","new_name"],

    data() {
      return {
        textDecoration: 'none',
        isTextDecorated: false,
      };
    },
    methods:{
      handleClick(id) {
        this.changeIcon(id);
        this.toggleTextDecoration(id);
      },
      changeIcon(id){
        this.$emit("changeIcon", id);
      },
      removeTag(id){
        this.$emit("removeTag", id);
      },
      toggleDetails(id){
        this.$emit("toggleDetails", id);
      },
      updateTag(id){
        this.$emit("updateTag", id);
      },
      addTag(){
        this.$emit("addTag");
      },
      toggleTextDecoration() {
        this.isTextDecorated = !this.isTextDecorated;

        if (this.isTextDecorated) {
          this.textDecoration = 'line-through';
        } else {
          this.textDecoration = 'none';
        }
     },
    },
}
</script>
