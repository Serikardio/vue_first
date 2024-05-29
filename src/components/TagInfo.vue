<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="flex items-center justify-between">
        <h2>Информация</h2>
        <button @click="closeModal">Закрыть</button>
      </div>
      <p>Секция: {{ $route.params.section }}</p>
      <p>Описание задачи: {{ $route.params.name}}</p>
      <p>ID: {{ $route.params.id }}</p>
      <p>Готовность: {{ $route.params.ready }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"INFO",
  data() {
    return {
      isVisible: true
    };
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
      this.$emit('close');
      this.$router.push({ name: 'home' });
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
