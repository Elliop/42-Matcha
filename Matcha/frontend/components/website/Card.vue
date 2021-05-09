<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

  export default {
    asyncData () {
      const token = this.$route.query.token;
      const obj = { token: `${token}` };
      return axios.post('http://localhost:6937/auth/token', obj)
        .then((res) => {
          return {  snackbar: true,
                    text: res.data.token,
                    timeout: 8000,
                  }
        })
        .catch(err => console.log(err));
    }
  }
</script>