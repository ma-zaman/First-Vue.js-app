<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="user in users" :key="user._id">
      <v-card elevation="10">
        <v-card-title primary-title>
          <div class="headline">
            <v-btn class="orange--text">
              Bolck user
            </v-btn>
            <v-btn class="red--text">
              Delete user
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = location.protocol + '//' + location.hostname + ':' + 8081;

export default {
  name: 'Users',
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      return axios({
        method: 'get',
        url: '/users/all',
      })
        .then((response) => {
          this.users = response.data.users;
        })
        .catch(() => {
        });
    },
  },
};
</script>
