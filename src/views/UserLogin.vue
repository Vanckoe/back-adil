<template>
  <div>
    <h1>Вход</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" type="email" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input id="password" v-model="form.password" type="password" required>
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import authService from '@/services/auth.service';

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    async login() {
  const response = await authService.login(this.form);
  if (response.success) {
    const userRole = localStorage.getItem('roles');
    if (userRole === 'Admin') { 
        this.$router.push('/adminpage'); 
    } else {
        this.$router.push('/usercategory'); 
    }
  } else {
    console.error("An error occurred during login.", response.errors);
  }
}

  
  }
  
}
</script>

<style scoped>

</style>
