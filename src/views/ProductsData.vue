<template>
  <div class="container">
    
    <div class="mb-5">
      <h3>Add Product</h3>
      <form @submit.prevent="addProduct">
        <input type="text" v-model="newProduct.title" placeholder="Title" required>
        <input type="text" v-model="newProduct.brand" placeholder="Brand" required>
        <input type="text" v-model="newProduct.description" placeholder="Description" required>
        <button type="submit">Add Product</button>
      </form>
    </div>
    
    <div class="row">
      <div class="col-md-4" v-for="(product, index) in products" :key="index">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{product.brand}}</h6>
            <p class="card-text">{{product.description}}</p>
            <RouterLink :to="'/product/' + product.id" class="nav-link">Get Full Information</RouterLink>

            <button @click="deleteProduct(index)">Delete</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      newProduct: {
        title: '',
        brand: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState('productsdata', ['products'])
  },
  methods: {
    ...mapActions('productsdata', ['GET_PRODUCTS', 'CREATE_PRODUCT', 'DELETE_PRODUCT']),
    async addProduct() {
      await this.CREATE_PRODUCT(this.newProduct);
      this.newProduct = { title: '', brand: '', description: '' };
    },
    async deleteProduct(index) {
      await this.DELETE_PRODUCT(index);
    }
  },
  async created() {
    await this.GET_PRODUCTS();
  }
}
</script>

<style scoped>

</style>
