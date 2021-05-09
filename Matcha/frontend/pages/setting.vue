<template>
  <v-row style="margin: 6vh 1vh 0 1vh">
    <v-col cols="12" xl="4" lg="4" md="4">
      <pic />
    </v-col>
    <v-col cols="12" xl="8" lg="8" md="8">
      <info />
    </v-col>
  </v-row>
</template>

<script>
import pic from "@/components/app/setting/pic";
import info from "@/components/app/setting/info";
import axios from "axios";
import {mapActions, mapGetters} from 'vuex';
export default {
  layout: "app",
  components: { pic, info },
  methods: {
    ...mapActions(['SetToken']),
  },
   created(){
    this.SetToken(this.$cookies.get("token"))
  },
  mounted() {
    const tmp = this.$cookies.get('token');
    const obj = {tmp: tmp};
    axios.post('http://localhost:6937/profile/completed', obj)
    .then((res) => {
      if (res.data.completed == 1)
        this.$router.push("/setting");
      else if (res.data.completed == 0)
        this.$router.push("/completeProfile");
    })
    .catch(err => console.log(err))
  },
};
</script>