<template>
    <div>
      <h1>Клиенты</h1>
      <div>
        <input type="text" v-model="newClient.firstName" placeholder="Имя">
        <input type="text" v-model="newClient.lastName" placeholder="Фамилия">
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
        <input type="text" v-model="selectedClient.firstName" placeholder="Имя">
        <input type="text" v-model="selectedClient.lastName" placeholder="Фамилия">
        <button @click="confirmEditClient">Сохранить изменения</button>
        <button @click="cancelEditClient">Отменить</button>
      </div>
    </div>
  </template>
  
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
  