<template>
  <v-row>
    <profile />
  </v-row>
</template>

<script>
import profile from "@/components/app/profile/profile";
import axios from "axios";
import {mapActions, mapGetters} from 'vuex';
export default {
  layout: "app",
  components: { profile },
  methods: {
    ...mapActions(['SetToken']),
  },
   created(){
    this.SetToken(this.$cookies.get("token"))
  },
  mounted() {
    const tmp = this.$cookies.get('token');

      const obj = {tmp: tmp};
      axios.post('http://localhost:6937/check/tmp', obj)
      .then((res) => {
        if (res.data == "True")
        {
          axios.post('http://localhost:6937/profile/completed', obj)
          .then((res) => {
            if (res.data.completed == 1)
              this.$router.push("/profile");
            else if (res.data.completed == 0)
              this.$router.push("/completeProfile");
          })
          .catch(err => console.log(err))
        }
        else
        {
          this.$cookies.removeAll();
          this.$router.push("/");
        }
      })
      .catch(err => console.log(err)) 
  },
};
</script>