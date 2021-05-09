<template>
  <v-dialog max-width="550px" v-model="dialog">
<!-- Snack Bar -->
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
<!-- Modal activator -->
    <template v-slot:activator="{ on }">
      <v-btn outlined color="primary" slot="activator" v-on="on" style="float: right">
          <v-icon left>mdi-pencil</v-icon> Edit
        </v-btn>
    </template>
<!-- Modal Content -->
    <v-card>
      <v-card-title class="pb-2">
        <v-toolbar-title>Edit Email</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- x -->
        <v-btn icon depressed slot="activator" v-on:click="dialog = !dialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <!-- Form -->
      <v-card-text class="pt-2">
        <!-- Register -->
        <v-form v-model="valid">
            <v-text-field v-model="register.email" outlined label="New Email" type="email" :rules="emailRules" required></v-text-field>
            <v-text-field v-model="register.password" outlined label="Password" type="password" :rules="passwordRules" required></v-text-field>
            <v-btn @click="ft_email" width="100%" :disabled="!valid" color="primary">EDIT</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      register: {},
      valid: true,
      dialog: false,
      snackbar: false,
      timeout: 8000,
      status: "login",
      text: '',
      ///// Rules /////
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 8) || 'Password must be more than 8 characters',
        v => /[A-Z]/.test(v) || 'Password must be valid',
        v => /[a-z]/.test(v) || 'Password must be valid',
        v => /[0-9]/.test(v) || 'Password must be valid',
      ],
    };
  },
  methods: {
    ft_email: async function() {
      const respons = await this.register_req();
      this.snackbar = true;
      this.text = respons.res.data.msg;
    },
    register_req: async function() {
      const tmp = this.$cookies.get('token');
      this.register.tmp = tmp;
        return axios.post('http://localhost:6937/set/email', this.register)
        .then((res) => {
          if (res.data == "Logout")
          {
              this.$cookies.removeAll();
              this.$router.push("/");
          }
          return { res }
          })
        .catch(err => console.log(err))
    },
  }
};
</script>