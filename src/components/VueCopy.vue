<template>
  <div>
    <p class="text-2xl">Vue test</p>
    <div v-if="groupedTags">
      <div v-for="(tags, section) in groupedTags" :key="section" class="section">
        <h2>Section: {{ section }}</h2>
        <ul>
          <li v-for="tag in tags" :key="tag.id">
            Name: {{ tag.name }}
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
    };
  },

  computed: {
    groupedTags() {
      return this.groupBySection(this.tags);
    },
  },

  mounted() {
    this.createTag({name: "tag", section: "sales"});
    this.createTag({name: "tag", section: "task"});
    this.createTag({name: "tag", section: "sales"});
    this.createTag({name: "tag", section: "task"});

    console.log(this.groupedTags);

    // Теперь domTags не требуется, так как отображение происходит через шаблон
    this.updateTag(3, "NEW");
    this.removeTag(2);

    console.log(this.tags);
  },

  methods: {
    createTag({section, name}) {
      let tag = {
        id: ++this.id_num,
        name: name + this.id_num,
        section,
      };
      this.tags.push(tag);
    },
    removeTag(id) {
      let index = this.tags.findIndex(tag => tag.id === id);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    },
    updateTag(id, newName) {
      let tag = this.tags.find(tag => tag.id === id);
      if (tag) {
        tag.name = newName;
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
  },
};
</script>
