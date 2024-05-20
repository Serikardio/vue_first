<template>
  <div class="ml-2">
    <p class="text-3xl pb-4">Vue test</p>

    <div>
      <p class="text-2xl font-medium pb-2">Search</p>

      <div class="flex items-center ">
        <input v-model="srh_text" class="border rounded flex items-center px-2" placeholder="Name">
       </div>
    </div>

    <div>
      <p class="font-medium text-2xl my-1.5">Create a Tag</p>

      <input v-model="new_name" class="border rounded flex items-center px-2 mb-2" placeholder="Name">
      <input v-model="new_section" class="border rounded flex items-center px-2 mb-2" placeholder="Section">

      <div class="flex">

        <button v-on:click="addTag"
                class="flex items-center justify-center mx-0.5 w-20 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700">
          Create
        </button>

        <button v-on:click="DeleteTag"
                class="flex items-center justify-center mx-0.5 w-20 h-7 bg-blue-500 text-white rounded -mb-0.5 hover:bg-blue-700">
          Delete
        </button>

      </div>
    </div>

    <div v-if="filteredTags">
      <div v-for="(tags, section) in filteredTags" v-bind:key="section" class="section">
        <div class="flex items-center">

          <h2 class=" flex items-center font-medium my-2">
          <span class="text-gray-600 mr-1">Section:</span>
          {{ section }}
          </h2>

          <button class="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

        </div>

        <ul>
          <li class="font-normal ml-4" v-for="tag in tags" :key="tag.id">
            <div class="flex items-center">
              <div class="-mt-1 flex items-center w-28">
                <div class="text-gray-700 mr-1">Name:</div>
                {{ tag.name }}
              </div>
              <button @click="removeTag(tag.id)" class="flex items-center justify-center ml-1 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 -0.5 25 25" fill="none">
                  <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"/>
                </svg>
              </button>
              <button @click="toggleDetails(tag.id)" class="flex items-center justify-center ml-1 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M4.75 9.233C4.75 9.64721 5.08579 9.983 5.5 9.983C5.91421 9.983 6.25 9.64721 6.25 9.233H4.75ZM6.25 5.5C6.25 5.08579 5.91421 4.75 5.5 4.75C5.08579 4.75 4.75 5.08579 4.75 5.5H6.25ZM5.5 4.75C5.08579 4.75 4.75 5.08579 4.75 5.5C4.75 5.91421 5.08579 6.25 5.5 6.25V4.75ZM9.233 6.25C9.64721 6.25 9.983 5.91421 9.983 5.5C9.983 5.08579 9.64721 4.75 9.233 4.75V6.25ZM6.03033 4.96967C5.73744 4.67678 5.26256 4.67678 4.96967 4.96967C4.67678 5.26256 4.67678 5.73744 4.96967 6.03033L6.03033 4.96967ZM9.96967 11.0303C10.2626 11.3232 10.7374 11.3232 11.0303 11.0303C11.3232 10.7374 11.3232 10.2626 11.0303 9.96967L9.96967 11.0303ZM15.767 18.75C15.3528 18.75 15.017 19.0858 15.017 19.5C15.017 19.9142 15.3528 20.25 15.767 20.25V18.75ZM19.5 20.25C19.9142 20.25 20.25 19.9142 20.25 19.5C20.25 19.0858 19.9142 18.75 19.5 18.75V20.25ZM18.75 19.5C18.75 19.9142 19.0858 20.25 19.5 20.25C19.9142 20.25 20.25 19.9142 20.25 19.5H18.75ZM20.25 15.767C20.25 15.3528 19.9142 15.017 19.5 15.017C19.0858 15.017 18.75 15.3528 18.75 15.767H20.25ZM18.9697 20.0303C19.2626 20.3232 19.7374 20.3232 20.0303 20.0303C20.3232 19.7374 20.3232 19.2626 20.0303 18.9697L18.9697 20.0303ZM15.0303 13.9697C14.7374 13.6768 14.2626 13.6768 13.9697 13.9697C13.6768 14.2626 13.6768 14.7374 13.9697 15.0303L15.0303 13.9697ZM6.25 15.767C6.25 15.3528 5.91421 15.017 5.5 15.017C5.08579 15.017 4.75 15.3528 4.75 15.767H6.25ZM4.75 19.5C4.75 19.9142 5.08579 20.25 5.5 20.25C5.91421 20.25 6.25 19.9142 6.25 19.5H4.75ZM5.5 18.75C5.08579 18.75 4.75 19.0858 4.75 19.5C4.75 19.9142 5.08579 20.25 5.5 20.25V18.75ZM9.233 20.25C9.64721 20.25 9.983 19.9142 9.983 19.5C9.983 19.0858 9.64721 18.75 9.233 18.75V20.25ZM4.96967 18.9697C4.67678 19.2626 4.67678 19.7374 4.96967 20.0303C5.26256 20.3232 5.73744 20.3232 6.03033 20.0303L4.96967 18.9697ZM11.0303 15.0303C11.3232 14.7374 11.3232 14.2626 11.0303 13.9697C10.7374 13.6768 10.2626 13.6768 9.96967 13.9697L11.0303 15.0303ZM15.767 4.75C15.3528 4.75 15.017 5.08579 15.017 5.5C15.017 5.91421 15.3528 6.25 15.767 6.25V4.75ZM19.5 6.25C19.9142 6.25 20.25 5.91421 20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75V6.25ZM20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75C19.0858 4.75 18.75 5.08579 18.75 5.5H20.25ZM18.75 9.233C18.75 9.64721 19.0858 9.983 19.5 9.983C19.9142 9.983 20.25 9.64721 20.25 9.233H18.75ZM20.0303 6.03033C20.3232 5.73744 20.3232 5.26256 20.0303 4.96967C19.7374 4.67678 19.2626 4.67678 18.9697 4.96967L20.0303 6.03033ZM13.9697 9.96967C13.6768 10.2626 13.6768 10.7374 13.9697 11.0303C14.2626 11.3232 14.7374 11.3232 15.0303 11.0303L13.9697 9.96967ZM6.25 9.233V5.5H4.75V9.233H6.25ZM5.5 6.25H9.233V4.75H5.5V6.25ZM4.96967 6.03033L9.96967 11.0303L11.0303 9.96967L6.03033 4.96967L4.96967 6.03033ZM15.767 20.25H19.5V18.75H15.767V20.25ZM20.25 19.5V15.767H18.75V19.5H20.25ZM20.0303 18.9697L15.0303 13.9697L13.9697 15.0303L18.9697 20.0303L20.0303 18.9697ZM4.75 15.767V19.5H6.25V15.767H4.75ZM5.5 20.25H9.233V18.75H5.5V20.25ZM6.03033 20.0303L11.0303 15.0303L9.96967 13.9697L4.96967 18.9697L6.03033 20.0303ZM15.767 6.25H19.5V4.75H15.767V6.25ZM18.75 5.5V9.233H20.25V5.5H18.75ZM18.9697 4.96967L13.9697 9.96967L15.0303 11.0303L20.0303 6.03033L18.9697 4.96967Z" fill="#000000"/>
                </svg>
              </button>
            </div>
            <div v-if="selectedID === tag.id" class="flex items-center my-1">
              <input v-model="name" class="border rounded flex items-center h-6 px-2" placeholder="Name">
              <button class="flex items-center justify-center mx-1 w-20 h-6 bg-blue-500 text-white rounded hover:bg-blue-700" @click="updateTag(tag.id)">
                Update
              </button>
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
      name: "",
      new_name: "",
      new_section: "",
      selectedID: null,
      srh_text: "",
    };
  },

  computed: {
    groupedTags() {
      return this.groupBySection(this.tags);
    },
    filteredTags() {
      if (!this.srh_text) {
        return this.groupedTags;
      }
      let filtered = this.tags.filter(tag => tag.name.toLowerCase().includes(this.srh_text.toLowerCase()));
      return this.groupBySection(filtered);
    }
  },

  mounted() {
    this.loadTags();
  },

  methods: {
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
        this.name = ''
        this.selectedID = null;
      }
    },

    groupBySection(tags) {
      return tags.reduce((res, tag) => {
        if (!res[tag.section]) {
          res[tag.section] = [];
        }
        res[tag.section].push({ name: tag.name, id: tag.id });
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
