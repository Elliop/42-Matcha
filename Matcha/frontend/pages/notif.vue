<template>
  <v-row style="margin: 1vh">
    <notif />
  </v-row>
</template>

<script>
import notif from "@/components/app/notif/notif";
import axios from "axios";
import {mapActions, mapGetters} from 'vuex';
export default {
  layout: "app",
  components: { notif },
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
        this.$router.push("/notif");
      else if (res.data.completed == 0)
        this.$router.push("/completeProfile");
    })
    .catch(err => console.log(err))
  },
};
</script>