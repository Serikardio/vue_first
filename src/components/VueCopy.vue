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
    <ToDoApp :selectedID="selectedID"
             :new_name="new_name" :new_section="new_section"
             :tags="tags"
             :filteredTags="filteredTags" :toggleTextDecoration="toggleTextDecoration"
             @toggleTextDecoration="toggleTextDecoration"
             @changeIcon="changeIcon" @removeTag="removeTag"
             @toggleDetails="toggleDetails" @addTag="addTag"
             @updateTag="updateTag" @DeleteTag="DeleteTag"
             @l_new_name="handleNameUpdate" @l_new_section="HTU"
             @US="HTB"
             @Selected="Selected" @LocalName="LN"
             @selectedID="MJ" @addSection="ADDTag"
             @closeDiv="closeDivHandler"


    ></ToDoApp>
</div>
  <!--  </div>-->
</template>

<script>
import ToDoApp from "@/components/ToDoApp.vue"

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
    closeDivHandler() {
      // Логика закрытия дива
      this.selectedID = null; // или другая логика закрытия дива
    },
    handleNameUpdate(l_new_name) {
      this.new_name = l_new_name;
    },
    HTU(l_new_section) {
      this.new_section = l_new_section;
      console.log(this.new_section)
    },
    HTB(new_section){
      this.new_section = new_section;
      console.log(this.new_section)
    },
    LN(l_name){
      this.name = l_name;
    },
    MJ(){
        this.selectedID = null;
    },

    changeIcon(id){
      let tag = this.tags.find(tag => tag.id === id);
      if (tag) {
        tag.ready = !tag.ready;
        this.saveTags()
        this.selectedID = null;
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
          this.saveTags();
        }
      }
      else (
            alert("Вы не выбрали Секцию или имя")
        );
    },
    ADDTag() {
      const newSection = this.new_section.trim();
      if ( newSection !== '') {
        const existingTag = this.tags.find(tag => tag.section === newSection);
        if (!existingTag) {
          this.createSection({section: newSection });
          this.saveTags();
        }
      }
    },

    createTag({ section, name }) {
      let tag = {
      id: ++this.id_num,
      name: {
        text: name,
        textDecoration: 'none',
        isTextDecorated: false,
      },
      section,
      ready: false,
    };
      this.tags.push(tag);
      this.saveTags();
    },
    createSection({ section }) {
      let tag = {
      id: ++this.id_num,
      name: {
        text: "Delete me!",
        textDecoration: 'none',
        isTextDecorated: false,
      },
      section,
      ready: false,
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
        console.log( (tag))
        tag.name.text = this.name
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

    toggleTextDecoration(tagId) {
      let tag = this.tags.find(tag => tag.id === tagId);
      if (tag) {
        tag.name.textDecoration = tag.name.textDecoration === 'line-through' ? 'none' : 'line-through';
        this.saveTags();
      }
    },

    Selected(tagId) {
      if (this.selectedID === tagId) {
        this.selectedID = null;
      } else {
        this.selectedID = tagId;
      }
      this.saveTags();
    },

  },
};
</script>
