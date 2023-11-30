<template>
  <div>
    <h1>Products</h1>
    <div class="gap-20 mAuto" v-if="isAdmin">
      <input class="input m0" type="text" v-model="newProduct.name" placeholder="Product Name">
      <input class="input m0" type="number" v-model="newProduct.quantity" placeholder="Quantity">
      <input class="input m0" type="number" v-model="newProduct.price" placeholder="Price">
      <select class="input m0" v-model="newProduct.category_id">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>

      </select>
      <button class="inputBtn" @click="addProduct">Add Product</button>
    </div>
    <ul class="productBox">
      <li class="biBox" v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.quantity }} - {{ product.price }}
        <div v-if="isAdmin">
          <button @click="startEditProduct(product)">Edit</button>
          <button @click="deleteProduct(product.id)">Delete</button>
        </div>
      </li>
    </ul>
    <div class="gap-20 mt-20 mAuto" v-if="selectedProduct">
      <input class="input" type="text" v-model="selectedProduct.name">
      <input class="input" type="number" v-model="selectedProduct.quantity">
      <input class="input" type="number" v-model="selectedProduct.price">
      <select class="input m0" v-model="selectedProduct.category_id">
        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
      </select>

      <button class="inputBtn" @click="confirmEditProduct">Save Changes</button>
      <button class="inputBtn" @click="cancelEditProduct">Cancel</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      products: [],
      categories: [],
      newProduct: {
        name: '',
        quantity: 0,
        price: 0,
        category_id: null
      },
      isAdmin: false,
      selectedProduct: null,
    };
  },
  created() {
    this.checkUserRoleAndLoadData();
  },
  methods: {
    async checkUserRoleAndLoadData() {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const rolesResponse = await this.$http.get('/roles', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        this.isAdmin = rolesResponse.data.some(role => role.name === 'Admin');
        this.loadProducts();
        this.loadCategories();
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    },
    async loadProducts() {
      try {
        const response = await this.$http.get('/product/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },
    async loadCategories() {
      try {
        const response = await this.$http.get('/category/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    },
    async addProduct() {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.post('/product/products', this.newProduct, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadProducts();
        this.newProduct = { name: '', quantity: 0, price: 0, category_id: null };
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    startEditProduct(product) {
      this.selectedProduct = { ...product };
    },
    async confirmEditProduct() {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.put(`/product/products/${this.selectedProduct.id}`, this.selectedProduct, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadProducts();
        this.selectedProduct = null;
      } catch (error) {
        console.error('Error editing product:', error);
      }
    },
    cancelEditProduct() {
      this.selectedProduct = null;
    },
    async deleteProduct(id) {
      const token = localStorage.getItem('authToken');
      try {
        await this.$http.delete(`/product/products/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
  },
};
</script>
<style>
.gap-20 {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.m0 {
  margin-top: 0;
}

.productBox {
  display: flex;
  width: 70%;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: center;
  margin: auto;
  margin-top: 50px;
}

.biBox {
  width: 30%;
  padding: 20px;
  background-color: #e9e9e9;
  border-radius: 10px;
  height: 150px;
}

.mt-20 {
  margin-top: 20px;
}

.mAuto {
  margin: auto;
}
</style>