<template>
  <v-app>
    <Navbar />
      <v-dialog max-width="550px" v-model="dialog">
        <!-- Snack Bar -->
        <div class="text-center">
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
            <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </div>
        <v-card dark color="rgb(0, 0, 0, 0.5)">
          <v-card-title class="pb-2">
            <v-toolbar-title>Change Password</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon depressed slot="activator" v-on:click="dialog = !dialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pt-2">
            <template>
              <v-form v-model="valid">
                <v-text-field v-model="newPassword.password" outlined label="New Password" type="password" :rules="passwordRules" required></v-text-field>
                <v-btn @click="ft_new" width="100%" color="rgb(0, 0, 0, 0.3)" :disabled="!valid">New Password</v-btn>
              </v-form>
            </template>
          </v-card-text>
        </v-card>
      </v-dialog>
    <Background />
    <Footer />
  </v-app>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import Background from "@/components/website/Background";

export default {
  components: { Navbar, Footer, Background },
  mounted() {
    const cookieRes = this.$cookies.get('token')
    if (cookieRes)
      this.$router.push("/completeProfile");
  },
  data() {
    return {
      valid: false,
      text: "",
      newPassword: {},
      timeout: 8000,
      snackbar: false,
      dialog: true,
      passwordRules: [
        v => !!v || 'New Password is required',
        v => (v && v.length > 8) || 'Password must be more than 8 characters',
        v => /[A-Z]/.test(v) || 'Password must be valid',
        v => /[a-z]/.test(v) || 'Password must be valid',
        v => /[0-9]/.test(v) || 'Password must be valid',
      ],
    };
  },
  methods: {
    ft_new: async function() {
      const respons = await this.newPassword_req();
      this.snackbar = true;
      this.text = respons.res.data.msg;
    },
    newPassword_req: async function(ctx) {
      this.valid = false;
      const token = this.$route.query.token;
      this.newPassword.token = token;
      return axios.post('http://localhost:6937/auth/newPassword', this.newPassword)
        .then((res) => {
          return { res }
          })
        .catch(err => console.log(err))
    },
  }
};
</script>