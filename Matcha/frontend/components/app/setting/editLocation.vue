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
        <v-toolbar-title>Edit Location</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- x -->
        <v-btn icon class="mx-2" color="primary" @click="ft_reset">
          <v-icon>mdi-lock-reset</v-icon>
        </v-btn>
        <v-btn icon depressed slot="activator" v-on:click="dialog = !dialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <!-- Form -->
      <v-card-text class="pt-2">
        <!-- Register -->
        <v-form v-model="valid">
            <v-text-field v-model="lat" outlined label="Latitude" type="number" :rules="latRules" required></v-text-field>
            <v-text-field v-model="lng" outlined label="Longitude" type="number" :rules="lngRules" required></v-text-field>
            <v-btn @click="ft_location" width="100%" :disabled="!valid" color="primary">EDIT</v-btn>
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
      lat: "",
      lng: "",
      valid: true,
      dialog: false,
      snackbar: false,
      timeout: 8000,
      status: "login",
      text: '',
      ///// Rules /////
      latRules: [
        v => !!v || 'Latitude is required',
      ],
      lngRules: [
        v => !!v || 'Longitude is required',
      ],
    };
  },
  methods: {
    ft_reset: async function() {
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
        this.lat = loc[0];
        this.lng = loc[1];
      })
      .catch(error => {
        console.log(error);
      });
    },
    ft_location: async function() {
      const respons = await this.location_req();
      this.snackbar = true;
      this.text = respons.res.data.msg;
    },
    location_req: async function() {
      const tmp = this.$cookies.get('token');
      let obj = {};
      obj.tmp = tmp
      obj.lat = this.lat
      obj.lng = this.lng
        return axios.post('http://localhost:6937/set/location', obj)
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
  },
  mounted() {
      const tmp = this.$cookies.get('token');
      const obj = {tmp: tmp};
      axios.post('http://localhost:6937/profile/data', obj)
      .then((res) => {
          if (res.data == "Logout")
          {
              this.$cookies.removeAll();
              this.$router.push("/");
          }
          this.lat = res.data.data[0].lat;
          this.lng = res.data.data[0].lng;
      })
      .catch(err => console.log(err))
  },
};
</script>