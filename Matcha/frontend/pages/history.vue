<template>
  <v-row style="margin: 1vh">
    <histo />
  </v-row>
</template>

<script>
import histo from "@/components/app/history/histo";
import axios from "axios";
import {mapActions, mapGetters} from 'vuex';
export default {
  layout: "app",
  components: { histo },
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
        this.$router.push("/history");
      else if (res.data.completed == 0)
        this.$router.push("/completeProfile");
    })
    .catch(err => console.log(err))
  },
};
</script>