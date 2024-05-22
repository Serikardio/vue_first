<template>
<!--  <div class="ml-2">-->
<!--    <p class="text-3xl pb-4">Vue test</p>-->

<!--    <div>-->
<!--      <p class="text-2xl font-medium pb-2">Search</p>-->

<!--      <div class="flex items-center">-->
<!--        <input v-model="srh_text" class="border rounded flex items-center px-2" placeholder="Name">-->
<!--&lt;!&ndash;        @keydown.space.prevent &ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="my-2">-->
<!--      <p class="text-2xl font-medium pb-2">Filter</p>-->
<!--      <div class="flex items-center">-->
<!--        <select v-model="status" class="w-48 h-8 border rounded ">-->
<!--          <option value="true" >Выполненно</option>-->
<!--          <option value="false" >Не выполненно</option>-->
<!--        </select>-->
<!--      </div>-->
<!--      <div>-->
<!--        <button-->
<!--            @click="applyFilter"-->
<!--            class="flex items-center justify-center mt-2 mx-0.5 w-16 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700" >-->
<!--          Поиск-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
<!--&lt;!&ndash; Создать выбор по фильтру выполненно или нет&ndash;&gt;-->

<!--    <div>-->
<!--      {{ FillTags }}-->
<!--    </div>-->

<!--    <div>-->
<!--      <p class="font-medium text-2xl my-1.5">Create a Tag</p>-->

<!--      <input v-model="new_name" class="border rounded flex items-center px-2 mb-2" placeholder="Name">-->
<!--      <input v-model="new_section" class="border rounded flex items-center px-2 mb-2" placeholder="Section">-->

<!--      <div class="flex">-->

<!--        <button v-on:click="addTag"-->
<!--                class="flex items-center justify-center mx-0.5 w-20 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700">-->
<!--          Create-->
<!--        </button>-->

<!--        <button v-on:click="DeleteTag"-->
<!--                class="flex items-center justify-center mx-0.5 w-20 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700">-->
<!--          Delete-->
<!--        </button>-->

<!--      </div>-->
<!--    </div>-->

<div>
    <ToDoApp :filteredTags="filteredTags"  :selectedID="selectedID"
             :new_name="new_name" @toggleTextDecoration="toggleTextDecoration"
             @changeIcon="changeIcon" @removeTag="removeTag"
             @toggleDetails="toggleDetails" @addTag="addTag" ></ToDoApp>
</div>
  <!--  </div>-->
</template>

<script>
import ToDoApp from "@/components/ToDoApp.vue";

export default {
  components: {ToDoApp},
  data() {
    return {
      tags: [],
      id_num: 0,
      name: "",
      new_name: "",
      new_section: "",
      selectedID: null,
      srh_text: "",
      status: "true",
      FillTags: [],
      textDecoration: {},
    };
  },

  computed: {
    groupedTags() {
      return this.groupBySection(this.tags);
    },

    filteredTags() {
      if (!this.srh_text || this.srh_text.trim() === "") {
        return this.groupedTags;
      }

      let filtered = this.tags.filter(tag => tag.name.toLowerCase().includes(this.srh_text.toLowerCase()));
      return this.groupBySection(filtered);
    },
  },

  mounted() {
    this.loadTags();
  },

  methods: {
    // Создать метод который бы искал в тегах ready и если они тру то сортировал бы в отдельный масив

    applyFilter() {
      const readyValue = this.status === "true";
      this.FillTags = this.tags.filter(tag => tag.ready === readyValue);

    },

    changeIcon(id){
      let tag = this.tags.find(tag => tag.id === id);
      if (tag) {
        tag.ready = !tag.ready;
        this.saveTags()
      }
    },
    toggleDetails(tagId) {
      this.selectedID = this.selectedID === tagId ? null : tagId;
    },

    DeleteTag() {
      let section = this.new_section;
      let name = this.new_name;
      let tag = this.tags.find(tag => tag.name === name && tag.section === section);
      if (tag) {
        this.removeTag(tag.id);
      }
    },

    addTag() {
      const newName = this.new_name.trim();
      const newSection = this.new_section.trim();
      if (newName !== '' && newSection !== '') {
        const existingTag = this.tags.find(tag => tag.name === newName && tag.section === newSection);
        if (!existingTag) {
          this.createTag({ name: newName, section: newSection });
          this.new_name = '';
          this.new_section = '';
          this.saveTags();
        }
      }
    },

    createTag({ section, name }) {
      let tag = {
        id: ++this.id_num,
        name,
        section,
        ready: false,
        textDecoration: 'none',
        isTextDecorated: false,
      };
      this.tags.push(tag);
      this.saveTags();
    },

    removeTag(id) {
      let index = this.tags.findIndex(tag => tag.id === id);
      if (index !== -1) {
        this.tags.splice(index, 1);
        this.saveTags();
      }
    },

    updateTag(id) {
      let tag = this.tags.find(tag => tag.id === id);
      if (tag) {
        tag.name = this.name;
        this.saveTags()
        this.name = ''
        this.selectedID = null;
      }
    },

    groupBySection(tags) {
      return tags.reduce((res, tag) => {
        if (!res[tag.section]) {
          res[tag.section] = [];
        }

        res[tag.section].push(tag);
        return res;
      }, {});
    },

    saveTags() {
      localStorage.setItem('tags', JSON.stringify(this.tags));
    },

    loadTags() {
      let storedTags = localStorage.getItem('tags');
      if (storedTags) {
        this.tags = JSON.parse(storedTags);
        this.id_num = this.tags.length ? this.tags[this.tags.length - 1].id : 0;
      }
    },

     toggleTextDecoration(id) {
      if (!this.textDecoration[id]) {
        this.$set(this.textDecoration, id, 'none');
      }
      this.textDecoration[id] = this.textDecoration[id] === 'none' ? 'line-through' : 'none';
    },

    // Selected(tagId) {
    //   if (this.selectedID === tagId) {
    //     this.selectedID = null;
    //   } else {
    //     this.selectedID = tagId;
    //   }
    //   this.saveTags();
    // },

  },
};
</script>
