<template>
    <div>
      <h1>Категории</h1>
      <ul>
        <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: []
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await this.$http.get('/category/categories');
          this.categories = response.data;
        } catch (error) {
          console.error("Ошибка при получении категорий:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
 
  </style>
  