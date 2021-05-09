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
        <v-btn width="400" color="primary" slot="activator" v-on="on">Blocked</v-btn>
    </template>
<!-- Modal Content -->
    <v-card>
      <v-card-title class="pb-2">
        <v-toolbar-title>Blocked</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- x -->
        <v-btn icon depressed slot="activator" v-on:click="dialog = !dialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
        <v-divider></v-divider>
          <v-row v-for="item in items2" :key="item.id" class="mx-3">
              <v-col>
                <v-avatar size="75">
                    <v-img :src="item.pic"></v-img>
                </v-avatar>                  
              </v-col>
            <v-col>
                <v-card-text class="mt-4">
                    <span>{{ item.username }}</span>
                </v-card-text>                
            </v-col>
            <v-col>
                <v-btn
                    @click="() => ft_unblock(item.id)"
                    color="primary"
                    width="90%"
                    style="margin: 1vh 0"
                    slot="activator"
                    class="mt-5"
                >Unblock</v-btn>                   
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
        items2: [],
        dialog: false,
        snackbar: false,
        timeout: 8000,
        text: '',
    };
  },
  methods: {
    ft_unblock: async function(id) {
      this.snackbar = true;
      this.text = 'User Unblocked Successfully';      
      const respons = await this.unblock_req(id);
    },
    unblock_req: function(id) {
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.id2 = id;
      obj.tmp = tmp;
      return axios.post('http://localhost:6937/match/unblock', obj)
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
    const tmp = this.$cookies.get("token");
    const obj = { tmp: tmp };
    axios
      .post("http://localhost:6937/match/blocked", obj)
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
          });
        }
        this.items2 = tmp;
      })
      .catch(err => console.log(err));
  },
};
</script>