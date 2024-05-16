<template>
  <div>
    <p class="text-2xl">Vue test</p>
  </div>
</template>
<script>
  export default {

    data(){
      return{
        tags: [],
        id_num: 0,
      };
    },

    computed: {
    },

    mounted() {
      this.createTag({name: "tag", section: "sales"});
      this.createTag({name: "tag", section: "task"});
      this.createTag({name: "tag", section: "sales"});
      this.createTag({name: "tag", section: "task"});
      const groupedTags = this.groupBySection(this.tags);
      console.log(groupedTags);

      this.domTags(groupedTags);

      this.updateTag(3, "NEW")
      this.removeTag(2)

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
      domTags(res) {

      const container = document.createElement('div');
      container.id = 'tagContainer';

      document.body.appendChild(container);

      for (const section in res) {

          const sectionDiv = document.createElement('div');
          sectionDiv.className = 'section';

          const sectionHeader = document.createElement('h2');
          sectionHeader.textContent ="Section: " + section;
          sectionDiv.appendChild(sectionHeader);

          const tagsList = document.createElement('ul');
          res[section].forEach(tag => {

              const tagItem = document.createElement('li');
              tagItem.textContent = "Name: " + tag.name;
              tagsList.appendChild(tagItem);

              // const tagID = document.createElement('li');
              // tagID.textContent = tag.id;
              // tagsList.appendChild(tagID);
          });

          sectionDiv.appendChild(tagsList);
          container.appendChild(sectionDiv);
      }
    },
    },
  };
</script>
