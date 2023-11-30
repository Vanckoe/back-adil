<template>
  <div class="container">
    <h1 class="titleReg">Вход</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email"></label>
        <input id="email" class="input" v-model="form.email" type="email" required placeholder="Почта: ">
      </div>
      <div>
        <label for="password"></label>
        <input id="password" class="input" v-model="form.password" type="password" required placeholder="Пароль: ">
      </div>
      
      <div class="accept">
        <button class="input inputBtn" type="submit">Войти</button>
        <RouterLink :to="'/register'" class="nav-link">Регистрация</RouterLink>
      </div>
    </form>
  </div>
</template>

<style>
.categoryCss {
  margin-top: 100px;
  margin-right: 20px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  text-decoration: none;
}
.flex{
  display: flex;
  gap: 20;
  margin: auto;
}
.gap-20{
  display: flex;
  grid-template: 20px;
}



.container {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 200px;
}

.titleReg {
  font-size: 32px;
}

.input {
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  background-color: #f3f3f3;
  padding: 10px;
  width: 250px;
  color: black;
}

.input:active,
.input:hover {
  background-color: #f3f3f3;
}

.inputBtn {
  min-width: 140px;
  width: auto;
  margin: 0;

}

.inputBtn:hover {
  background-color: rgb(4, 187, 4);
  color: white;
}

.accept {
  display: flex;
  width: 250px;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

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

