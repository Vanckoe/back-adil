<template>
  <nav class="header navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ul-nav">
          <!-- <li class="nav-item">
            <RouterLink :to="'/'" class="nav-link">Home</RouterLink>
          </li> -->
          <!-- <li class="nav-item">
            <RouterLink :to="'/users'" class="nav-link">Users</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/posts'" class="nav-link">Posts</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="'/products'" class="nav-link">Products</RouterLink>
          </li> -->
          <!-- <li class="nav-item">
            <RouterLink :to="'/register'" class="nav-link">Register</RouterLink>
          </li> -->
          <li class="nav-item">
            <RouterLink :to="'/login'" class="nav-link">log out</RouterLink>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome Nurkhan! How are you?" text="Let's make new code"/>-->
  <!--  <PostsData/>-->
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import PostsData from "@/views/PostsData.vue";

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // PostsData
  }
}
</script>

<style>
.header {
  display: flex !important;
  flex-basis: auto;
  justify-content: flex-end;
  flex-direction: row;
}

.navbar-expand-lg .navbar-collapse {
  display: flex !important;
  flex-basis: auto;
  justify-content: flex-end;
}

.ul-nav {
  display: flex;
  gap: 40px;
  margin-right: 150px;
  padding: 20px 0 10px;
  justify-content: flex-end;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}</style>
