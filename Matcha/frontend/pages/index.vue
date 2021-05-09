<template>
  <v-app>
    <Navbar />
    <Background />
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import Background from "@/components/website/Background";

export default {
  components: { Navbar, Footer, Background },
    created() {},
  data() {
    return {}
  },
  mounted() {
    const cookieRes = this.$cookies.get('token')
    if (cookieRes)
      this.$router.push("/profile");
    else
      this.$router.push("/");
  },
};
</script>