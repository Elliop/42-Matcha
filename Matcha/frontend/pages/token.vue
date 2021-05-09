<template>
  <v-app>
    <Navbar />
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
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
  asyncData (ctx) {
    const token = ctx.route.query.token;
    const obj = { token: `${token}` };
    return axios.post('http://localhost:6937/auth/token', obj)
      .then((res) => {
        return {  snackbar: true,
                  text: res.data.token,
                  timeout: 8000,
                }
      })
      .catch(err => console.log(err));
    },
  mounted() {
    const cookieRes = this.$cookies.get('token')
    if (cookieRes)
      this.$router.push("/completeProfile");
    else
      this.$router.push("/");
  },
  }
</script>