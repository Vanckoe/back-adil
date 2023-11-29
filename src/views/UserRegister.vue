<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Имя:</label>
        <input id="name" v-model="name" type="text" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    registerUser() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$http.post('/register', userData)
        .then(response => {
          
          localStorage.setItem('authToken', response.data.token); 
          this.$router.push('/category'); 
        })
        .catch(error => {
          console.error(error);
          
        });
    }
  }
};
</script>