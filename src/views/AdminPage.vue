<template>
  <div>
    <h1 class="titleReg">Выберите страницу:</h1>
    <button class="btnChose" @click="goToPage('/category')">Category</button>
    <button class="btnChose" @click="goToPage('/adminproduct')">Product</button>
    <button class="btnChose" @click="goToPage('/adminclient')">Client</button>
  </div>
</template>
  
<script>
export default {
  methods: {
    goToPage(path) {
      this.$router.push(path);
    }
  }
};
</script>
  
<style>
button {
  margin: 10px;
  padding: 5px 15px;
  border-radius: 10px;
  border: none;
}
.titleReg {
  margin-top: 100px;
  font-size: 32px;
}

button:hover {
  background-color: rgb(4, 187, 4);
  color: white;
}
</style>
  