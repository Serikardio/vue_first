<template>
  <div class="ml-2">
    <p class="text-2xl">Vue test</p>
    <div>
      <p class="font-medium text-2xl my-1.5" >Create a Tag</p>
      <input v-model="new_name" class="border rounded flex items-center px-2 mb-2" placeholder="Name" >
      <input v-model="new_section" class="border rounded flex items-center px-2 mb-2 " placeholder="Section" >
      <div class="flex">
          <button v-on:click="addTag" class="flex items-center justify-center mx-0.5 w-20 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700" >Create</button>
          <button v-on:click="DeleteTag" class="flex items-center justify-center mx-0.5 w-20 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700" >Delete</button>
      </div>
    </div>
    <!--Добавить проверку на одинаковые слова в секциях-->
    <div v-if="groupedTags">
      <div v-for="(tags, section) in groupedTags" v-bind:key="section" class="section">
        <h2 class="font-medium my-1 ">Section: {{ section }}</h2>
        <ul>
         <li class="font-normal ml-4" v-for="tag in tags" :key="tag.id">
            <div class="flex items-center">
              Name: {{ tag.name }}
              <button @click="removeTag(tag.id)" class="flex items-center justify-center border rounded p-0.5 w-5 h-5 ml-1">X</button>
              <button @click="Selected(tag.id)" class="flex items-center justify-center border rounded p-0.5 w-5 h-5 ml-1">Y</button>
            </div>
            <div v-if="editingTagId === tag.id" class="flex items-center">
              <input v-model="name" class="border rounded flex items-center px-2 mb-2" placeholder="Name">
              <button @click="updateTag(tag.id)">Обновить</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      id_num: 0,
      name:"",
      new_name: "",
      new_section: "",
      editingTagId: null,
    };
  },

  computed: {
    groupedTags() {
      return this.groupBySection(this.tags);
    },
  },

  mounted() {
    // this.createTag({name: "tag", section: "sales"});
    // this.createTag({name: "tag", section: "task"});
    // this.createTag({name: "tag", section: "sales"});
    // this.createTag({name: "tag", section: "task"});
    //
    // console.log(this.groupedTags);
    //
    // this.updateTag(3, "NEW");
    // this.removeTag(2);
    //
    // console.log(this.tags.length);

    this.loadTags();
  },

  methods: {
    // DeleteTag() {
    //     this.tag in tags{
    //      НУЖЕН метод файнд и найти по имени айди тега и run функцию removeTag(id)
    //   }
    // },
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
        // Проверяем, что такого имени в данной секции ещё нет
        const existingTag = this.tags.find(tag => tag.name === newName && tag.section === newSection);
        if (!existingTag) {
          this.createTag({ name: newName, section: newSection });
          this.new_name = '';
          this.new_section = '';
          this.saveTags();
        }
      }
    },
    createTag({section, name}) {
      let tag = {
        id: ++this.id_num,
        name: name,
        section,
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
        this.name = '';
      }
    },
    groupBySection(tags) {
      return tags.reduce((res, tag) => {
        if (!res[tag.section]) {
          res[tag.section] = [];
        }
        res[tag.section].push({name: tag.name, id: tag.id});
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
    Selected(tagId) {
      if (this.editingTagId === tagId) {
        this.editingTagId = null;
      } else {
        this.editingTagId = tagId;
      }
      this.saveTags();
    },
  },
};
</script>
