<template>
  <div class="container">
    <div class="mb-5">
      <h3 class="mb-3">Add Product</h3>
      <form @submit.prevent="addProduct" class="mb-3">
        <div class="form-group">
          <input type="text" v-model="newProduct.title" class="form-control" placeholder="Title" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="newProduct.brand" class="form-control" placeholder="Brand" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="newProduct.description" class="form-control" placeholder="Description" required>
        </div>
        <button type="submit" class="btn btn-dark">Add Product</button>
      </form>
    </div>
    
    <div class="row">
      <div class="col-md-4" v-for="(product, index) in products" :key="index">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ product.brand }}</h6>
            <p class="card-text">{{ product.description }}</p>
            <router-link :to="'/product/' + product.id" class="nav-link">Get Full Information</router-link>
            <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
            <button @click="openModal(product)" class="btn btn-dark">Change Product</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h4 class="mb-3">Change Product</h4>
        <div class="form-group">
          <input v-model="editedProductTitle" class="form-control" placeholder="New Title" required>
        </div>
        <div class="form-group">
          <input v-model="editedProductBrand" class="form-control" placeholder="New Brand" required>
        </div>
        <div class="form-group">
          <input v-model="editedProductDescription" class="form-control" placeholder="New Description" required>
        </div>
        <button @click="updateProduct" class="btn btn-dark">Save</button>
        <button @click="closeModal" class="btn btn-light">Cancel</button>
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
      },
      showModal: false,
      editedProductTitle: '',
      editedProductBrand: '',  
      editedProductDescription: '',  
      editedProductIndex: -1
    }
  },
  computed: {
    ...mapState('productsdata', ['products'])
  },
  methods: {
    ...mapActions('productsdata', ['GET_PRODUCTS', 'CREATE_PRODUCT', 'DELETE_PRODUCT', 'UPDATE_PRODUCT_BY_ID']),
    async addProduct() {
      await this.CREATE_PRODUCT(this.newProduct);
      this.newProduct = { title: '', brand: '', description: '' };
    },
    async deleteProduct(productId) {
    await this.DELETE_PRODUCT(productId);
  },
  openModal(product) {
    this.editedProductIndex = this.products.findIndex(p => p.id === product.id);
    this.editedProductTitle = product.title;
    this.editedProductBrand = product.brand;
    this.editedProductDescription = product.description; 
    this.showModal = true;
},
    closeModal() {
      this.showModal = false;
      this.editedProductIndex = -1;
      this.editedProductTitle = '';
    },
    async updateProduct() {
    if (this.editedProductIndex !== -1) {
        const productId = this.products[this.editedProductIndex].id;
        const updatedProductData = {
          title: this.editedProductTitle,
          brand: this.editedProductBrand,  
          description: this.editedProductDescription  
        };
        await this.UPDATE_PRODUCT_BY_ID({ id: productId, updatedProductData });
        this.closeModal();
    }
}

  },
  async created() {
    await this.GET_PRODUCTS();
  }
}
</script>

<style scoped>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>