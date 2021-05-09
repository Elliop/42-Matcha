<template>
  <v-dialog max-width="550px" v-model="dialog1">
<!-- Snack Bar -->
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
<!-- Modal activator -->
    <template v-slot:activator="{ on }">
        <v-btn width="400" color="primary" slot="activator" v-on="on">Friends</v-btn>
    </template>
<!-- Modal Content -->
    <v-card>
      <v-card-title class="pb-2">
        <v-toolbar-title>Friends</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- x -->
        <v-btn icon depressed slot="activator" v-on:click="dialog1 = !dialog1">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
        <v-divider></v-divider>
        <v-row v-for="item in itemss" :key="item.id" class="mx-3">
            <v-col>
              <v-avatar size="75">
                  <v-img :src="item.pic"></v-img>
              </v-avatar>                  
            </v-col>
          <v-col>
              <v-card-text class="mt-3">
                  <span>{{ item.username }}</span>
              </v-card-text>                
          </v-col>
            <v-col>
                <v-card-text class="mt-2">
                    <v-chip>
                      <span>{{ item.conn }}</span>                  
                    </v-chip>                    
                </v-card-text>
            </v-col>
          <v-col>
              <v-btn
                  @click="() => ft_unlike(item.id)"
                  color="primary"
                  width="90%"
                  style="margin: 1vh 0"
                  slot="activator"
                  class="mt-5"
              >Unlike</v-btn>                   
          </v-col>
        </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
        itemss: [],
        dialog1: false,
        snackbar: false,
        timeout: 8000,
        text: '',
    };
  },
  methods: {
    ft_unlike: async function(id) {
      this.snackbar = true;
      this.text = 'User Unliked Successfully';       
      await this.unlike_req(id);
    },
    unlike_req: function(id) {
      this.$socket.emit('notification', {
        id: id
      });
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.id2 = id;
      obj.tmp = tmp;
      axios.post('http://localhost:6937/match/unlike', obj)
      .then((res) => {
        })
      .catch(err => console.log(err))
    },
  },
  mounted() {
    const tmp = this.$cookies.get("token");
    const obj = { tmp: tmp };
    axios
      .post("http://localhost:6937/match/friends", obj)
      .then(data => {
        if (data.data == "Logout")
        {
          this.$cookies.removeAll();
          this.$router.push("/");
        }
        let tmp = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          tmp.push({
            username: element.username,
            pic: element.pic,
            id: element.id,
            conn: element.conn,
          });
        }
        this.itemss = tmp;
      })
      .catch(err => console.log(err));
  },
};
</script>