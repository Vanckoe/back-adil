<template>
  <div class="container mt-5" v-if="productById">
    <div class="row">
      <div class="col-lg-4">
        <img :src="productById.thumbnail" class="img-fluid" alt="Product Thumbnail">
      </div>
      <div class="col-lg-8">
        <h2 class="mb-3">{{productById.title}}</h2>
        <p><strong>Description:</strong> {{productById.description}}</p>
        <p><strong>Price:</strong> {{productById.price}}</p>
        <p><strong>Discount Percentage:</strong> {{productById.discountPercentage}}</p>
        <p><strong>Rating:</strong> {{productById.rating}}</p>
        <p><strong>Stock:</strong> {{productById.stock}}</p>
        <p><strong>Brand:</strong> {{productById.brand}}</p>
        <p><strong>Category:</strong> {{productById.category}}</p>
        
        <button @click="beginEdit">Edit</button>
        <button @click="deleteProduct">Delete</button>

        <div v-if="editing">
          <input type="text" v-model="editedProduct.title">
          <button @click="saveEdit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProductData",
  data() {
    return {
      productId: this.$route.params.id,
      editing: false,
      editedProduct: {}
    };
  },
  computed: {
    ...mapState('productsdata', ['products']),
    productById() {
      return this.products.find(p => p.id == this.productId);
    }
  },
  methods: {
    ...mapActions('productsdata', ['UPDATE_PRODUCT_BY_ID', 'DELETE_PRODUCT']),
    beginEdit() {
      this.editing = true;
      this.editedProduct = { ...this.productById };
    },
    async saveEdit() {
      await this.UPDATE_PRODUCT_BY_ID({ id: this.productId, updatedProductData: { title: this.editedProduct.title } });
      this.editing = false;
    },
    cancelEdit() {
      this.editing = false;
      this.editedProduct = {};
    },
    async deleteProduct() {
      await this.DELETE_PRODUCT(this.productId);
      this.$router.push({ name: 'ProductsData' });
    },
    fetchProductData() {
      
    }
  },
  created() {
    this.fetchProductData();
  }
}
</script>

<style scoped>
  .carousel-item img {
    max-height: 200px; 
    width: auto;
    margin: 0 auto;
    display: block;
  }
</style>
