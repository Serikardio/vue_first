<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>Информация о задаче</h2>
      <p>Описание задачи: {{ taskDescription }}</p>
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    taskDescription: {
      type: String,
      required: true
    }
  },
  watch: {
    isVisible(value) {
      if (value) {
        document.body.classList.add('modal-open')
      } else {
        document.body.classList.remove('modal-open')
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
</style>
