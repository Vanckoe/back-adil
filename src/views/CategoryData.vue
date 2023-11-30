<template>
  <div>
    <h1>Категории</h1>
    <div v-if="isAdmin">
      <input type="text" v-model="newCategoryName" placeholder="Название новой категории">
      <button @click="addCategory">Добавить Категорию</button>
    </div>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
        <div v-if="isAdmin">
          <button @click="startEditCategory(category)">Изменить</button>
          <button @click="deleteCategory(category.id)">Удалить</button>
        </div>
      </li>
    </ul>
    <div v-if="selectedCategory">
      <input type="text" v-model="selectedCategory.name">
      <button @click="confirmEditCategory">Сохранить изменения</button>
      <button @click="cancelEditCategory">Отменить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      newCategoryName: '',
      isAdmin: false,
      selectedCategory: null,
    };
  },
  created() {
    this.checkUserRoleAndLoadCategories();
  },
  methods: {
    async checkUserRoleAndLoadCategories() {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      console.log(localStorage.getItem('authToken'));

      try {
        const rolesResponse = await this.$http.get('/roles', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        })
        // this.isAdmin =rolesResponse.data.some(true);
        this.isAdmin = rolesResponse.data.some(role => role.name === 'Admin');
        this.loadCategories();
      } catch (error) {
        console.error('Ошибка при проверке роли пользователя:', error);
      }
    },
    async loadCategories() {
      try {
        const response = await this.$http.get('/category/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    },
    async addCategory() {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.post('/category/categories', {
          name: this.newCategoryName
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadCategories();
        this.newCategoryName = '';
      } catch (error) {
        if (error.response.status === 409) {
          alert('Категория с таким именем уже существует');
        } else {
          console.error('Ошибка добавления категории:', error);
        }
      }
    },
    startEditCategory(category) {
      this.selectedCategory = { ...category };
    },
    async confirmEditCategory() {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.put(`/category/categories/${this.selectedCategory.id}`, {
          name: this.selectedCategory.name
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadCategories();
        this.selectedCategory = null;
      } catch (error) {
        console.error('Ошибка редактирования категории:', error);
      }
    },
    cancelEditCategory() {
      this.selectedCategory = null;
    },
    async deleteCategory(id) {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.delete(`/category/categories/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadCategories();
      } catch (error) {
        console.error('Ошибка удаления категории:', error);
      }
    },
  },
};
</script>