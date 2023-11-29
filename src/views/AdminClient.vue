<template>
  <div class="container">
    <div class="headTitle">
      <h1 class="titleRegC">Клиенты </h1>
      <RouterLink :to="'/adminpage'" class="nav-link">Назад</RouterLink>
    </div>


    <div class="gap10">
      <input class="input" type="text" v-model="newClient.firstName" placeholder="Имя">
      <input class="input" type="text" v-model="newClient.lastName" placeholder="Фамилия">
      <button @click="addClient">Добавить Клиента</button>
    </div>
    <ul>
      <li v-for="client in clients" :key="client.id">
        {{ client.firstName }} {{ client.lastName }}
        <button @click="startEditClient(client)">Редактировать</button>
        <button @click="deleteClient(client.id)">Удалить</button>
      </li>
    </ul>
    <div v-if="selectedClient">
      <input class="input" type="text" v-model="selectedClient.firstName" placeholder="Имя">
      <input class="input" type="text" v-model="selectedClient.lastName" placeholder="Фамилия">
      <button @click="confirmEditClient">Сохранить изменения</button>
      <button @click="cancelEditClient">Отменить</button>
    </div>
  </div>
</template>
  
<style>
.headTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 60px;
}

.gap10 {
  display: flex;
  gap: 10px;
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
import axios from 'axios';

export default {
  data() {
    return {
      clients: [],
      newClient: {
        firstName: '',
        lastName: ''
      },
      selectedClient: null,
    };
  },
  created() {
    this.loadClients();
  },
  methods: {
    async loadClients() {
      try {
        const response = await axios.get('/client/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Ошибка загрузки клиентов:', error);
      }
    },
    async addClient() {
      try {
        const response = await axios.post('/api/clients', this.newClient);
        this.clients.push(response.data);
        this.newClient = { firstName: '', lastName: '' };
      } catch (error) {
        console.error('Ошибка добавления клиента:', error);
      }
    },
    startEditClient(client) {
      this.selectedClient = { ...client };
    },
    async confirmEditClient() {
      try {
        await axios.put(`/client/clients/${this.selectedClient.id}`, this.selectedClient);
        this.loadClients();
        this.selectedClient = null;
      } catch (error) {
        console.error('Ошибка редактирования клиента:', error);
      }
    },
    cancelEditClient() {
      this.selectedClient = null;
    },
    async deleteClient(id) {
      try {
        await axios.delete(`/client/clients/${id}`);
        this.loadClients();
      } catch (error) {
        console.error('Ошибка удаления клиента:', error);
      }
    }
  }
};
</script>
  