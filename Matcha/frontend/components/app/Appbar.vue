<template>
  <div>
    <v-app-bar app color="accent" flat hide-on-scroll class="hidden-sm-and-down">
        <a href="http://localhost:3000/matcha">
            <v-hover v-slot:default="{ hover }">
                <v-toolbar-title class="logo secondary--text transition-fast-in-fast-out" :style="hover ? 'font-size: 30px;' : null">
                    <v-icon class="pr-2" color="secondary" large>mdi-atom-variant</v-icon>
                    <span class="font-weight-light">MAT</span>
                    <span>CHA</span>
                </v-toolbar-title>
            </v-hover>
        </a>
        <v-spacer></v-spacer>
        <a href="http://localhost:3000/notif">
          <v-btn icon style="margin: 0 1vh 0 0" @click="ft_notif">
            <v-badge>
              <template v-slot:badge>{{ notif }}</template>
              <v-icon color="secondary">mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </a>
        <v-hover v-slot:default="{ hover }" v-for="(btn, index) in btns" :key="index">
            <a :href="btn.route">
                <v-btn
                    nuxt
                    :color="hover ? 'primary' : 'secondary'"
                    class="uppercase white--text btn roboto-condensed"
                    text
                ><v-icon class="mr-1" color="secondary">{{ btn.iconn }}</v-icon><span color="secondary">{{btn.text}}</span></v-btn>
            </a>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
            <v-btn @click="ft_logout"
                :color="hover ? 'secondary' : 'primary'"
                outlined
                tile
                class="uppercase white--text btn ml-4 roboto-condensed"
            >LOG OUT</v-btn>
        </v-hover>
    </v-app-bar>  
    <v-app-bar app color="accent" flat hide-on-scroll class="hidden-md-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <a :href="item.route">
                <v-list-item-title>{{ item.text }}</v-list-item-title>                
              </a>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn @click="ft_logout"
                >LOG OUT</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from 'vuex';
export default {
  computed: mapGetters(["notif"]),
  data() {
    return {
      btns: [
        { text: 'Profile', route: '/profile', iconn: 'mdi-account' },
        { text: 'Chat', route: '/chat', iconn: 'mdi-forum' },
        { text: 'History', route: '/history', iconn: 'mdi-file-document-box-multiple' },
        { text: 'Setting', route: '/setting', iconn: 'mdi-settings' },
      ],
      items: [
        { text: 'Matcha', route: '/matcha' },
        { text: 'Notification', route: '/notif' },
        { text: 'Profile', route: '/profile' },
        { text: 'Chat', route: '/chat' },
        { text: 'History', route: '/history' },
        { text: 'Setting', route: '/setting' },
      ],
      num: 0,
    }
  },
  methods: {
    ...mapActions(['setNotification']),
    ft_logout() {
      this.logout_req();
      this.$cookies.removeAll();
      this.$router.push("/");
    },
    ft_notif() {
      this.num = 9;
      this.notif_req();
    },
    notif_req: async function() {
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.tmp = tmp;
      return axios.post("http://localhost:6937/notif/num", obj)
        .then((res) => {
          return (res)
        })
        .catch(err => console.log(err));
    },
    logout_req: async function(id) {
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.tmp = tmp;
      return axios.post("http://localhost:6937/auth/logout", obj)
        .then((res) => {
          return (res)
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
      const tmp = this.$cookies.get('token');
      const obj = {tmp: tmp};
      axios.post('http://localhost:6937/notif/dataNotif', obj)
      .then((res) => {
          if (res.data == "Logout")
          {
              this.$cookies.removeAll();
              this.$router.push("/");
          }
          this.num = res.data[0].num;
          this.setNotification(this.num);
      })
      .catch(err => console.log(err))
  },
}
</script>

<style scoped>
.logo
{
  font-weight: bold;
  font-size: 25px;
  letter-spacing: 0.02em;
  cursor: pointer;
  text-decoration: none;
}
.btn
{
  font-weight: bold;
  letter-spacing: 0.05em;
  font-size: 18px !important;
}
a
{
  text-decoration: none;
}
</style>