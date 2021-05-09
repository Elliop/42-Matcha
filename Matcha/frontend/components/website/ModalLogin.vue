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
      <v-btn depressed slot="activator" v-on="on" color="primary" outlined>
        <span>LOG IN</span>
        <v-icon right>mdi-login-variant</v-icon>
      </v-btn>
    </template>



<!-- Modal Content -->
    <v-card color="accent">
      <v-card-title class="pb-2">
        <v-toolbar-title>{{registerTitle()}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- x -->
        <v-btn icon depressed slot="activator" v-on:click="dialog = !dialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <!-- Form -->
      <v-card-text class="pt-2">
        <!-- Login -->
        <template v-if="status == `login`">
          <v-form v-model="valid" ref="register" method="post">
            <v-text-field v-model="login.username" outlined label="Username" type="text" :rules="usernameRules" required></v-text-field>
            <v-text-field v-model="login.password" outlined label="Password" type="password" :rules="passwordRules" required></v-text-field>
            <v-checkbox v-model="remember" label="Remember Me"></v-checkbox>
            <v-btn width="100%" @click="ft_login" color="primary" :disabled="!valid">LOGIN</v-btn>
          </v-form>
          <!-- Trouble -->
          <v-container fluid>
            <v-row justify="space-around" no-gutters>
              <v-col align="end" justify="center">
                <h2 class="body-2" style="text-decoration: underline; cursor: pointer" @click="Trouble" >Trouble Logging In?</h2>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <!-- Recover Account -->
        <v-form v-else-if="status == `recover`" v-model="valid" ref="register">
          <v-text-field v-model="forget.email" outlined label="Email Address" :rules="emailRules" type="email"></v-text-field>
          <v-btn @click="ft_forget" width="100%" :disabled="!valid" color="primary">RECOVER ACCOUNT</v-btn>
        </v-form>
        <!-- Register -->
        <v-form v-else-if="status == `register`" v-model="valid" ref="register">
          <v-text-field v-model="register.firstName" outlined label="First Name" type="text" :rules="FirstNameRules" required></v-text-field>
          <v-text-field v-model="register.lastName" outlined label="Last Name" type="text" :rules="LastNameRules" required></v-text-field>
          <v-text-field v-model="register.username" outlined label="Username" type="text" :rules="usernameRules" required></v-text-field>
          <v-text-field v-model="register.email" outlined label="Email Address" type="email" :rules="emailRules" required></v-text-field>
          <v-text-field v-model="register.password" outlined label="Password" type="password" :rules="passwordRules" required></v-text-field>
          <v-btn @click="ft_register" width="100%" :disabled="!valid" color="primary">SIGN UP</v-btn>
        </v-form>
        <!-- Have or Don't -->
        <v-container grid-list-md fluid class="pt-4 mt-3">
          <v-row>
            <h2>{{wanaSR()}}</h2>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="general" >{{buttonSR()}}</v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>




  </v-dialog>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from 'vuex';
export default {
  data() {
    return {
      register: {},
      login: {},
      forget: {},
      valid: true,
      dialog: false,
      remember: false,
      snackbar: false,
      timeout: 8000,
      status: "login",
      text: '',
      ///// Rules /////
      FirstNameRules: [
        v => !!v || 'First Name is required',
        v => (v && v.length <= 20) || 'First Name must be less than 20 characters',
      ],     
      LastNameRules: [
        v => !!v || 'Last Name is required',
        v => (v && v.length <= 20) || 'First Name must be less than 20 characters',
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 15) || 'Username must be less than 15 characters',
      ],
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
      ///// Title /////
      registerTitle: function() {
        switch (this.status) {
          case "login":
            return "Login";
          case "recover":
            return "Recover Your Account";
          case "register":
            return "Sign up";
        }
      },
      ///// Mdf /////
      SRwith: function() {
        return this.status == "login" ? "Login With" : "Sign Up With";
      },
      wanaSR: function() {
        return this.status == "login" ? "Don't have an account?" : "Already Have An Account?";
      },
      buttonSR: function() {
        return this.status == "login" ? "Sign Up" : "Login";
      },
    };
  },
  methods: {
    general: function() {
      this.status == `login` ? this.status = `register` : this.status = `login`
      this.$refs.register.reset();
    },
    ft_login: async function() {
      const respons = await this.login_req();
      this.snackbar = true;
      if (respons)
        this.text = respons.res.data.msg;
    },
    ft_register: async function() {
      const respons = await this.register_req();
      this.snackbar = true;
      this.text = respons.res.data.msg;
    },
    ft_forget: async function() {
      const respons = await this.forget_req();
      this.snackbar = true;
      this.text = respons.res.data.msg;
    },
    register_req: async function() {
        return axios.post('http://localhost:6937/auth/register', this.register)
        .then((res) => {
          return { res }
          })
        .catch(err => console.log(err))
    },
    ...mapActions(['SetToken']),
    login_req: async function() {
        return axios.post('http://localhost:6937/auth/login', this.login)
        .then((res) => {
          if (res.data.token)
          {
            this.$cookies.set('token', res.data.token, {})
/* 
            ////////////////////////////////////////////
            const Uid = res.data.id;
            ////////////////////////////////////////////
            this.$store.commit("setUid", Uid);
            ////////////////////////////////////////////
            console.log(this.$store.state.Uid);
*/
            axios.get("https://ipinfo.io/json?token=63f39e0edc15d5")
            .then(res => {
              let obj = {};
              const tmp = this.$cookies.get('token');
              obj.tmp = tmp;
              let loc = String(res.data.loc).split(",");
              obj.lat = loc[0];
              obj.lng = loc[1];
              obj.addresse = res.data.city + ", " + res.data.country;
              axios.post('http://localhost:6937/auth/loc', obj);
            })
            .catch(error => {
              console.log(error);
            });
            this.SetToken(this.$cookies.get("token"))
            this.$router.push("/profile");
          }
          else
            return { res }
          })
        .catch(err => console.log(err))
    },
    forget_req: async function() {
        return axios.post('http://localhost:6937/auth/forget', this.forget)
        .then((res) => {
          return { res }
          })
        .catch(err => console.log(err))
    },
    Trouble: function() {
      this.status = "recover";
    },
    reset () {
      this.$refs.form.reset()
    },
  }
};
</script>