<template>
  <div>
    <div class="flex items-center justify-center">

      <h1>Todo App</h1>
    </div>
    <div>
      <div>
        <div>
          <h2 class=" flex items-center font-medium my-2">
          <span class="text-gray-600 mr-1">Section:</span>
          {{ section }}
          </h2>

          <ul>
            <li>

              <div>

                <button>
<!--                  Check-->
                </button>

                <div class="-mt-1 flex items-center w-28">
                  <div class="text-gray-700 mr-1">To do:</div>
                  {{ tag.name }}
                </div>

              </div>

              <div>

                <button>
<!--             More-->
                </button>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  components: {},

  data() {
    return {
      tags:[],
    };
  },
}
</script>
