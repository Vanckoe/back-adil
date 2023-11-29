<template>
    <div>
      <h1>Выберите страницу:</h1>
      <button @click="goToPage('/category')">Category</button>
      <button @click="goToPage('/adminproduct')">Product</button>
      <button @click="goToPage('/adminclient')">Client</button>
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
  }
  </style>
  