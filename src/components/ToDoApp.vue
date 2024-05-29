<template >
  <div>
    <div class="flex items-center justify-center">
      <div class="my-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" viewBox="0 -0.5 25 25" fill="black">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="text-2xl font-medium">Todo App</h1>
    </div>

    <div class="flex items-center justify-center">
      <div v-if="filteredTags" style="width: 625px;">
        <div style="height: 550px;"  class="overflow-y-scroll  custom-scrollbar">
          <div v-for="(tags, section) in filteredTags" v-bind:key="section" class="section">
            <h2 class=" flex items-center font-medium my-2 text-xl">
               {{ section }}
            </h2>
            <ul class="mb-8">
              <li class="font-normal " v-for="tag in tags" :key="tag.id" >
                <div :class="{'flex mb-2 items-center justify-between rounded-lg p-2': true, 'bg-opacity-40': tag.ready, 'bg-opacity-65': !tag.ready, 'text-black': !tag.ready, 'text-gray-500': tag.ready,}" class="bg-white">
                  <div class="flex items-center">
    <!--                ReadyBTN-->
                    <button v-if="tag.ready" @click="handleClick(tag.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 -0.5 25 25" fill="black">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>

                    <button v-else @click="handleClick(tag.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400" viewBox="0 -0.5 25 25" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>

                    <div>
                      <p :style="{ 'text-decoration': tag.name.textDecoration }" class="-mt-0.5" >{{ tag.name.text }}</p>
                    </div>

                  </div>

                  <div>
                    <button @click="selected(tag.id)" class="flex items-center hover:bg-gray-100 hover:bg-opacity-60 rounded text-gray-500 hover:text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="18" cy="12" r="1.5" transform="rotate(90 18 12)" fill="currentColor"/>
                        <circle cx="12" cy="12" r="1.5" transform="rotate(90 12 12)" fill="currentColor"/>
                        <circle cx="6 " cy="12" r="1.5" transform="rotate(90 6  12)" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div  ref="myDiv" @click="handleDivClick" v-if="selectedID === tag.id" class="absolute ml-2 rounded w-auto p-2 h-auto bg-white bg-opacity-85 -mt-3" style="right: 470px;" >
                  <button @click="toggleDiv(tag.id)" class="text-sm rounded w-full flex items-center my-1 px-1 py-0.5 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                       <path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Edit task
                  </button>
                  <button v-if="tag.ready" @click="handleClick(tag.id)" class="text-sm rounded flex items-center px-1 my-1 py-0.5 hover:bg-gray-100 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-white" viewBox="0 -0.5 25 25" fill="black">
                       <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Mark as uncompleted
                  </button>

                  <button v-else @click="handleClick(tag.id)" class="text-sm rounded flex items-center px-1 my-1 py-0.5 hover:bg-gray-100 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-white" viewBox="0 -0.5 25 25" fill="black">
                       <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.0002C5.50024 8.66068 7.85944 5.78639 11.1348 5.1351C14.4102 4.48382 17.6895 6.23693 18.9673 9.32231C20.2451 12.4077 19.1655 15.966 16.3887 17.8212C13.6119 19.6764 9.91127 19.3117 7.55 16.9502C6.23728 15.6373 5.49987 13.8568 5.5 12.0002Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M9 12.0002L11.333 14.3332L16 9.66724" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Mark as completed
                  </button>

                  <button class="text-sm flex rounded items-center my-1 px-1 py-0.5  hover:bg-gray-100 w-full"
                          @click="openModal(tag)" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-5 mr-2 text-black" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 17V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="currentColor"/>
                    </svg>
                    Info
                  </button>

                  <button @click="removeTag(tag.id)" class="text-sm flex rounded items-center my-1 px-1 py-0.5 text-red-500 hover:bg-red-100 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 mr-2 text-red-500 h-4" viewBox="0 0 56 56">
                      <path d="M 11.6406 14.6641 L 13.1406 48.9062 C 13.2578 51.8359 15.0156 53.4297 17.8984 53.4297 L 38.125 53.4297 C 41.0078 53.4297 42.7656 51.8359 42.8828 48.9062 L 44.3828 14.6641 L 47.0781 14.6641 C 48.0391 14.6641 48.8125 13.8672 48.8125 12.9063 C 48.8125 11.9453 48.0391 11.1250 47.0781 11.1250 L 37.4453 11.1250 L 37.4453 7.7734 C 37.4453 4.5625 35.3125 2.5703 32.2891 2.5703 L 23.6640 2.5703 C 20.6406 2.5703 18.5313 4.5625 18.5313 7.7734 L 18.5313 11.1250 L 8.9453 11.1250 C 8.0078 11.1250 7.1875 11.9453 7.1875 12.9063 C 7.1875 13.8672 8.0078 14.6641 8.9453 14.6641 Z M 21.7187 7.7734 C 21.7187 6.4375 22.7031 5.5000 24.1094 5.5000 L 31.8672 5.5000 C 33.2969 5.5000 34.2813 6.4375 34.2813 7.7734 L 34.2813 11.1250 L 21.7187 11.1250 Z M 35.6172 48.6484 C 34.7031 48.6484 34.0703 47.8516 34.0938 46.8906 L 35.0547 19.7031 C 35.1016 18.7656 35.7813 17.9922 36.625 17.9922 C 37.4922 17.9922 38.1953 18.7422 38.1719 19.7031 L 37.1172 46.9141 C 37.0938 47.9219 36.4844 48.6484 35.6172 48.6484 Z M 20.4062 48.6484 C 19.5391 48.6484 18.9297 47.9219 18.9062 46.9141 L 17.8516 19.7031 C 17.8281 18.7187 18.5313 17.9922 19.3984 17.9922 C 20.2422 17.9922 20.9453 18.7656 20.9687 19.7031 L 21.9297 46.8906 C 21.9531 47.8516 21.3203 48.6484 20.4062 48.6484 Z M 29.6172 46.8906 C 29.6172 47.8516 28.8672 48.6484 28.0234 48.6484 C 27.1797 48.6484 26.4297 47.8516 26.4297 46.8906 L 26.4297 19.7031 C 26.4297 18.7656 27.1797 17.9922 28.0234 17.9922 C 28.8672 17.9922 29.6406 18.7656 29.6406 19.7031 Z"/>
                    </svg>
                    Delete task
                  </button>
                </div>
                <div v-if="show === tag.id" class=" flex items-center my-1">
  <!--                        tag.name.text-->
                      <input
                          value="tag.name.text"
                          v-model="l_name"
                          @input="LocalName"
                          class="border rounded flex items-center h-auto px-2 outline-none"
                          placeholder="Name">
                      <button class="flex items-center justify-center mx-1 w-20 h-6 bg-blue-500 text-white rounded hover:bg-blue-700"
                              @click="updateTag(tag.id)">
                        Update
                      </button>
                      <button class="flex items-center justify-center mx-1 w-20 h-6 bg-blue-500 text-white rounded hover:bg-blue-700"
                              @click="cls_btn">
                        Cancel
                      </button>
                </div>
              </li>
            </ul>
        </div>
        </div>

        <div v-if="isModalOpen"
             class="flex items-center "
             style="position: absolute; top: 50%;
                    left: 50%; transform: translate(-50%, -50%);">
          <input v-model="new_section"
                 @input="US"
                     class="border flex items-center h-10 px-2 rounded-br-none rounded-tr-none outline-none rounded"
                     placeholder="Section">
          <button @click="addSection"
                  class="flex items-center justify-center w-20 h-10 bg-black text-white hover:bg-blue-500">
            Add
          </button>
          <button @click="closeModal"
                  class="flex items-center ml-2 rounded justify-center w-20 h-10 bg-black text-white hover:bg-blue-500">
            Cancel
          </button>
        </div>

        <div  class="flex items-center" >
           <div style="width: 620px;" class="flex items-center" >

             <input v-model="l_new_name"
                    @input="updateName"
                    class="border rounded flex items-center rounded-br-none outline-none rounded-tr-none w-96 h-10 px-2 py-2"
                    placeholder="What do you need to do?">

             <select v-model="l_new_section"
                     @change="handleSelectChange"
                     class="border flex items-center h-10 w-48 px-2 outline-none">

               <option v-for="(tags, section) in allSections" :key="section" :value="section"  >
                  {{ section }}
               </option>

               <option value="New">
                 + New
               </option>

              </select>

             <button v-on:click="addTag"
                     class="flex items-center justify-center w-20 h-10 bg-black rounded-bl-none rounded-tl-none text-white rounded hover:bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white mr-2 " viewBox="0 0 24 24" fill="none">
                  <path d="M4 12H20M12 4V20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                 Add
             </button>
           </div>
        </div>
      </div>
    </div>
    <TagInfo v-if="isModalVisible" :isVisible="isModalVisible" :taskDescription="selectedTaskDescription" @close="isModalVisible = false" />
  </div>
</template>

<script>
  import TagInfo from "@/components/TagInfo.vue";

  export default {
    components: {TagInfo},
    props: ["selectedID", "filteredTags", "toggleTextDecoration" , "tags", "allSections"],

    data() {
      return {
        isModalVisible: false,
        selectedTaskDescription: '',
        show: null,
        l_name:"",
        l_new_name: "",
        l_new_section: "",
        new_section:"",
        isModalOpen: false,
        isUpdateOpen:false,
      };
    },
    methods:{
      handleClick(id) {
        this.changeIcon(id);
        this.toggleTextDecoration(id);
      },
      openModal(tag) {
        this.selectedTaskDescription = tag.name.text
        this.isModalVisible = true
      },
      handleSelectChange(event) {
        if (event.target.value === 'New') {
          this.isModalOpen = true;
        } else {
          this.updateSection(event);
        }
      },
      updateName() {
      this.$emit('l_new_name', this.l_new_name);
      },
      cls_btn(){
        this.show = null;
        this.l_name ="";
      },
      LocalName() {
      this.$emit('LocalName', this.l_name);
      },
      handleDivClick(event) {
        if (this.$refs.myDiv && !this.$refs.myDiv.contains(event.target)) {
                // Отправляем событие родителю для закрытия дива
                this.$emit('closeDiv');
            }
      },
      updateSection() {
      this.$emit('l_new_section', this.l_new_section);
      console.log(this.new_section)
      },
      US(){
        this.$emit('US', this.new_section );
      },
      closeModal() {
        this.isModalOpen = false;
      },
      changeIcon(id){
        this.$emit("changeIcon", id);
      },
      selected(id){
        this.$emit("Selected", id);
      },
      removeTag(id){
        this.$emit("removeTag", id);
      },
      toggleDetails(id){
        this.$emit("toggleDetails", id);
      },
      updateTag(id){
        this.$emit("updateTag", id)
        this.l_name = ""
        this.show = null
        ;
      },
      createSection(){
        this.$emit("createSection");
      },
      addTag(){
        this.$emit("addTag");
        this.l_new_name = '';
      },
      addSection(){
        this.$emit("addSection");
        this.isModalOpen = false
        this.new_section = "";
      },
      toggleDiv(tagId) {
        this.show = this.show === tagId ? null : tagId
        this.selected(tagId);
        this.l_name = (this.tags.find(tag => tag.id === tagId) || {}).name.text;
      },
    },
}
</script>

<style>
    body {
        background: linear-gradient(to right, #FFC0CB, #feb47b);
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px; /* Ширина полосы прокрутки */
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f100; /* Цвет фона трека */
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #88888800; /* Цвет ползунка */
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #55555500; /* Цвет ползунка при наведении */
    }
</style>