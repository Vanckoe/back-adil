<template>
  <div class="container">
    <div class="mb-5">
      <h3 >Add Product</h3>
      <form @submit.prevent="addProduct" class="mb-3 wqer">
        <div class="form-group">
          <input type="text" v-model="newProduct.title" class="form-control input" placeholder="Title" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="newProduct.brand" class="form-control input" placeholder="Brand" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="newProduct.description" class="form-control input" placeholder="Description" required>
        </div>
        <button type="submit" class="mt-30 inputBtn">Add Product</button>
      </form>
    </div>
    
    <div class="row">
      <div class="col-md-4" v-for="(product, index) in products" :key="index">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ product.brand }}</h6>
            <p class="card-text">{{ product.description }}</p>
            <router-link :to="'/product/' + product.id" class="nav-link c-blue">Get Full Information</router-link>
            <button @click="deleteProduct(product.id)" class="input btn btn-danger">Delete</button>
            <button @click="openModal(product)" class="input btn btn-dark">Change Product</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content gap-10">
        <h4 class="mb-3">Change Product</h4>
        <div class="form-group">
          <input v-model="editedProductTitle" class="form-control input wMax" placeholder="New Title" required>
        </div>
        <div class="form-group">
          <input v-model="editedProductBrand" class="form-control input wMax" placeholder="New Brand" required>
        </div>
        <div class="form-group">
          <input v-model="editedProductDescription" class="form-control input wMax" placeholder="New Description" required>
        </div>
        <button @click="updateProduct" class="btn btn-dark inputBtn">Save</button>
        <button @click="closeModal" class="btn btn-light inputBtn">Cancel</button>
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
.card-body{
  min-width: 30%;
  padding: 10px;
  border: 10px;
}
.mb-3 {
    margin-bottom: 1rem!important;
    display: flex;
    flex-direction: row;
    height: 400px;
    gap: 20px;
}
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
.mt-30{
  margin-top: 30px;
}
.wMax{
  width: 100%;
  color: #000;
}
.modal-content {
  background-color: #fff;
  padding: 20px 40px 20px 40px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 50%;
}
.c-blue{
  color: blue;
}
.gap-10{
  display: flex;
  gap: 20px;
}
.wqer{
  width: unset;
  height: unset;
}
</style>