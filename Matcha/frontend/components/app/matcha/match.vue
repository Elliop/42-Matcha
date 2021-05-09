<template>
<v-row>
  <v-col cols="12" xl="4" lg="4" md="4">
    <v-card color="accent">
      <v-card-title>Match With:</v-card-title>
      <v-divider></v-divider>
      <v-list subheader two-line flat color="accent">
        <v-list-item-group v-model="settings" multiple>
          <v-form method="post">
            <!-- Age -->
            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox color="primary" v-model="active" value="Age"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Age</v-list-item-title>
                  <v-row>
                    <v-col class="px-4">
                      <v-range-slider id="1" color="primary" v-model="rangeAge" :max="maxAge" :min="minAge" hide-details class="align-center">
                        <template v-slot:prepend>
                          <v-text-field v-model="rangeAge[0]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field v-model="rangeAge[1]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </template>
            </v-list-item>
            <!-- Fame Rating -->
            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox color="primary" v-model="active" value="Fame"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Fame Rating</v-list-item-title>
                  <v-row>
                    <v-col class="px-4">
                      <v-range-slider id="1" color="primary" v-model="rangeFame" :max="maxFame" :min="minFame" hide-details class="align-center">
                        <template v-slot:prepend>
                          <v-text-field v-model="rangeFame[0]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field v-model="rangeFame[1]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </template>
            </v-list-item>
            <!-- Localisation -->
            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox color="primary" v-model="active" value="Loc"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Localication (Km)</v-list-item-title>
                  <v-row>
                    <v-col class="px-4">
                      <v-range-slider  color="primary" v-model="rangeLoc" :max="maxLoc" :min="minLoc" hide-details class="align-center">
                        <template v-slot:prepend>
                          <v-text-field id="555" v-model="rangeLoc[0]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field id="556" v-model="rangeLoc[1]" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px"></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </template>
            </v-list-item>
            <!-- Tags -->
            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox color="primary" v-model="active" value="Tag"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Tags</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-btn dark width="100%" color="primary" @click="ft_matchWith">Match</v-btn>
          </v-form>
        </v-list-item-group>
      </v-list>
    </v-card>    
  </v-col>
  <v-col cols="12" xl="8" lg="8" md="8">
    <v-card color="accent" class="scroll" height="70%" width="100%">
          <div class="text-center">
            <v-snackbar v-model="snackbar" :timeout="timeout">
              {{ text }}
              <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
          </div>
          <v-row>
            <v-col align="center"><v-btn @click="sortBy('age')">Age</v-btn></v-col>
            <v-col align="center"><v-btn @click="sortBy('rating')">Fame Rating</v-btn></v-col>
            <v-col align="center"><v-btn @click="sortBy('distance')">Location</v-btn></v-col>
            <v-col align="center"><v-btn @click="sortBy('nb')">Tags</v-btn></v-col>
          </v-row>
      <v-row>
        <v-col v-for="item in items" :key="item.text" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-card style="margin: 1vh">
            <center>
              <v-avatar size="150" class="my-2">
                <v-img :src="item.pic"></v-img>
              </v-avatar>
              <v-btn
                @click="() => ft_user(item.id)"
                color="black"
                dark
                width="90%"
                slot="activator"
              >Profile</v-btn>
              <v-btn
                @click="() => ft_match(item.id)"
                color="primary"
                dark
                width="90%"
                style="margin: 1vh 0"
                slot="activator"
              >Like</v-btn>
              <div class="text-center" style="margin: 1vh">
                <v-rating
                  readonly
                  dense
                  background-color="black"
                  color="primary"
                  v-model="item.rating"
                ></v-rating>
              </div>
              <v-card-text>
                <span>{{ item.username }}</span>
                <span>{{ item.age }}</span>
              </v-card-text>
              <v-card-text>
                <span>{{ item.nbb }}</span>
              </v-card-text>
              <v-card-text>
                <span>{{ item.distancee }}</span>
              </v-card-text>
            </center>
          </v-card>
        </v-col>
        <v-dialog max-width="750px" eager v-model="dialog_user">
          <user :contextId="contextId" />
        </v-dialog>
      </v-row>
    </v-card>      
  </v-col>
</v-row>

</template>

<script>
import user from "./user";
import axios from "axios";
export default {
  components: { user },
  data() {
    return {
      sort: true,
      contextId: null,
      snackbar: false,
      timeout: 8000,
      status: "login",
      text: "",
      dialog_user: false,
      items: [],
                                          settings: [],
                                          active: ['Age', 'Loc', 'Fame', 'Tag'],
                                          ////////////////////
                                          rangeAge: [16, 99],
                                          minAge: 16,
                                          maxAge: 99,
                                          ////////////////////
                                          rangeFame: [1, 5],
                                          minFame: 1,
                                          maxFame: 5,
                                          ////////////////////
                                          rangeLoc: [0, 5000],
                                          minLoc: 0,
                                          maxLoc: 5000,
    };
  },
  mounted() {
    const tmp = this.$cookies.get("token");
    let obj = {};
    obj.tmp = tmp;
    for (let i = 0; i < this.active.length; i++)
    {
      if (this.active[i] == 'Age')
        obj.rangeAge = this.rangeAge
      if (this.active[i] == 'Loc')
        obj.rangeLoc = this.rangeLoc
      if (this.active[i] == 'Tag')
        obj.tag = "True"
      if (this.active[i] == 'Fame')
        obj.rangeFame = this.rangeFame
    }
    axios
      .post("http://localhost:6937/match/matchWith", obj)
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
            age: element.age,
            distancee: `${element.distance}km`,
            distance: element.distance,
            rating: element.rating,
            nbb: `${element.nb} Tags in common`,
            nb: element.nb
          });
        }
        this.items = tmp;
      })
      .catch(err => console.log(err));
  },
  methods: {
    sortBy(prop) {
      this.sort = !this.sort;
      if (this.sort == true)
        this.items.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
      else
        this.items.sort((a, b) => a[prop] < b[prop] ? 1 : -1)
    },
    ft_user: async function(id) {
      this.dialog_user = true;
      this.contextId = id;
      const respons = await this.user_req(id);
    },
    user_req: async function(id) {
      this.$socket.emit('notification', {
        id: id
      });
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.id2 = id;
      obj.tmp = tmp;
      const res = await axios.post("http://localhost:6937/history/vu", obj)
        .then((res) => {
        if (res.data == "Logout")
        {
            this.$cookies.removeAll();
            this.$router.push("/");
        }
          return { res }
        })
        .catch(err => console.log(err));
    },
    ft_match: async function(id) {
      const respons = await this.match_req(id);
      const respons1 = this.history_req(id);
      this.snackbar = true;
      this.text = respons.res.data.msg;
    },
    match_req: async function(id) {
      this.$socket.emit('notification', {
        id: id
      });
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.id = id;
      obj.tmp = tmp;
      return axios.post("http://localhost:6937/match/like", obj)
        .then((res) => {
        if (res.data == "Logout")
        {
            this.$cookies.removeAll();
            this.$router.push("/");
        }
          return { res }
        })
        .catch(err => console.log(err));
    },
    history_req: async function(id) {
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.id2 = id;
      obj.tmp = tmp;
      return axios.post("http://localhost:6937/history/likeHistory", obj)
        .then((res) => {
        if (res.data == "Logout")
        {
            this.$cookies.removeAll();
            this.$router.push("/");
        }
          return { res }
        })
        .catch(err => console.log(err));
    },
                                                        ft_matchWith: async function() {
                                                          const respons = await this.match_reqWith();
                                                        },
                                                        match_reqWith: async function() {
                                                          const tmp = this.$cookies.get("token");
                                                          let obj = {};
                                                          obj.tmp = tmp;
                                                          for (let i = 0; i < this.active.length; i++)
                                                          {
                                                            if (this.active[i] == 'Age')
                                                              obj.rangeAge = this.rangeAge
                                                            if (this.active[i] == 'Loc')
                                                              obj.rangeLoc = this.rangeLoc
                                                            if (this.active[i] == 'Tag')
                                                              obj.tag = "True"
                                                            if (this.active[i] == 'Fame')
                                                              obj.rangeFame = this.rangeFame
                                                          }
                                                          return axios.post("http://localhost:6937/match/matchWith", obj)
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
                                                                age: element.age,
                                                                distancee: `${element.distance}km`,
                                                                distance: element.distance,
                                                                rating: element.rating,
                                                                nbb: `${element.nb} Tags in common`,
                                                                nb: element.nb
                                                              });
                                                            }
                                                            this.items = tmp;
                                                          })
                                                          .catch(err => console.log(err));
                                                        },
  }
};
</script>

<style scoped>
</style>