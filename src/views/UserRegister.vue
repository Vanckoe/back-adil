<template>
  <div class="container">
    <h1 class="titleReg">Регистрация</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name"></label>
        <input class="input" id="name" v-model="name" type="text" required placeholder="Имя: ">
      </div>
      <div>
        <label for="email"></label>
        <input class="input" id="email" v-model="email" type="email" required placeholder="Почта: ">
      </div>
      <div>
        <label for="password"></label>
        <input class="input" id="password" v-model="password" type="password" required placeholder="Пароль: ">
      </div>
      <div class="accept">
        <button class="input inputBtn" type="submit">Зарегистрироваться</button>
        <RouterLink :to="'/login'" class="nav-link reset">Логин</RouterLink>
      </div>

    </form>
  </div>
</template>
<style>
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
}

.input:active,
.input:hover {
  background-color: #f3f3f3;
}

.inputBtn {
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