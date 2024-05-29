<template>
  <div>
      <ToDoApp :selectedID="selectedID"
               :new_name="new_name" :new_section="new_section"
               :tags="tags" :allSections="allSections"
               :filteredTags="filteredTags" :toggleTextDecoration="toggleTextDecoration"
               @toggleTextDecoration="toggleTextDecoration"
               @changeIcon="changeIcon" @removeTag="removeTag"
               @toggleDetails="toggleDetails" @addTag="addTag"
               @updateTag="updateTag" @DeleteTag="DeleteTag"
               @l_new_name="handleNameUpdate" @l_new_section="HTU"
               @US="HTB" @closeDiv="closeDivHandler"
               @Selected="Selected" @LocalName="LN"
               @selectedID="MJ" @addSection="ADDTag"
      />
<!--    :to="{name:'INFO',params:{description:'fffff'}}"-->
      <router-view ></router-view>
  </div>
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
    allSections() {
      const sections = this.groupBySection(this.tags);
      return sections;
    },
    groupedTags() {
      const validTags = this.tags.filter(tag => tag.name.text.trim() !== '');
      return this.groupBySection(validTags);
    },
    filteredTags() {
      if (!this.srh_text || this.srh_text.trim() === "") {
        return this.groupedTags;
      }

      let filtered = this.tags.filter(tag => tag.name.text.trim() !== '' && tag.name.text.toLowerCase().includes(this.srh_text.toLowerCase()));
      return this.groupBySection(filtered);
    },
  },

  mounted() {
    this.loadTags();
  },

  methods: {
    // deleteSectionsWithEmptyTags() {
    //   const tagsWithEmptyNames = this.tags.filter(tag => tag.name.text.trim() === "");
    //   const sectionsToDelete = new Set(tagsWithEmptyNames.map(tag => tag.section));
    //
    //   const filteredTags = this.tags.filter(tag => !sectionsToDelete.has(tag.section));
    //
    //   this.tags = filteredTags;
    // },
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
        text: "",
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
