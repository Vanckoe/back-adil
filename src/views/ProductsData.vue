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

            <button @click="deleteProduct(product.id)">Delete</button>
            <button @click="openModal(product)">Change Product</button>
            <div v-if="showModal" class="modal">
   <div class="modal-content">
     <h4>Change Product</h4>
     <input v-model="editedProductTitle" placeholder="New Title" required>
     <input v-model="editedProductBrand" placeholder="New Brand" required>
     <input v-model="editedProductDescription" placeholder="New Description" required> 
     <button  @click="updateProduct">Save</button>
     <button @click="closeModal">Cancel</button>
   </div>
</div>


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