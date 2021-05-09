<template>
<v-col>
  <v-row>
    <v-col>
        <v-row align="center" justify="center">
          <v-avatar size="250" class="pink darken-3 mt-6" align="center" justify="center">
            <img :src="Pic" />
          </v-avatar>
        </v-row>
        <v-row class="mt-10 mb-3" align="center" justify="center">
            <div class="text-center">
                <v-rating readonly background-color="black" color="primary" v-model="rating"></v-rating>
            </div>
        </v-row>
        <v-row align="center" justify="center">
            <span> {{ Bio }} </span>
        </v-row>
    </v-col>
  </v-row>
  <v-row>
        <v-col class="mt-1" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="mx-10 my-5" color="accent">
                <v-card-title>
                    <v-icon color="primary" class="mr-5">mdi-account-child</v-icon>
                    First Name: {{FirstName}}
                </v-card-title>
            </v-card>
        </v-col>
        <v-col class="mt-1" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="mx-10 my-5" color="accent">
                <v-card-title>
                    <v-icon color="primary" class="mr-5">mdi-account-child-circle</v-icon>
                    Last Name: {{LastName}}
                </v-card-title>
            </v-card>
        </v-col>
        <v-col class="mt-1" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="mx-10 my-5" color="accent">
                
                <v-card-title>
                    <v-icon color="primary" class="mr-5">mdi-account-convert</v-icon>
                    Username: {{Username}}
                </v-card-title>
            </v-card>
        </v-col>
  </v-row>
  <v-row>
        <v-col class="mt-1" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="mx-10 my-5" color="accent">
                <v-card-title>
                    <v-icon color="primary" class="mr-5">mdi-cake-variant</v-icon>
                    Birthday: {{Birthday}}
                </v-card-title>
            </v-card>
        </v-col>
        <v-col class="mt-1" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="mx-10 my-5" color="accent">
                <v-card-title>
                    <v-icon color="primary" class="mr-5">mdi-gender-male-female</v-icon>
                    Gender: {{Gender}}
                </v-card-title>
            </v-card>
        </v-col>
        <v-col class="mt-1" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="mx-10 my-5" color="accent">
                <v-card-title>
                    <v-icon color="primary" class="mr-5">mdi-gender-transgender</v-icon>
                    Sexual Preferences: {{SexualP}}
                </v-card-title>
            </v-card>
        </v-col>
  </v-row>
  <v-row align="center" justify="center">
      <v-col align="center" justify="center" class="mt-1" cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-card width="400" class="my-5" color="accent">
            <v-card-title>
                Tags
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-for="(tag, i) in Tags" :key="i">
                {{ tag }}
            </v-card-text>
        </v-card>
      </v-col>
        <v-col align="center" justify="center" class="mt-1" cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <v-row align="center" justify="center">
                <v-card width="400" class="my-5">
                    <Pics />
                </v-card>              
            </v-row>
            <v-row class="my-5" align="center" justify="center">
                <frinds />
            </v-row>
            <v-row class="my-5" align="center" justify="center">
                <blocked />
            </v-row>
        </v-col>
  </v-row>
</v-col>


</template>

<script>
import axios from "axios";
import Pics from "./pics";
import frinds from "./frinds";
import blocked from "./blocked";
export default {
    components: { Pics, frinds, blocked },
  data() {
    return {
        rating: 1,
        FirstName: "",
        LastName: "",
        Username: "",
        Birthday: "",
        Gender: "",
        SexualP: "",
        Pic: "",
        Bio: "",
        Tags: [],
        i: 0,
    };
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
        this.FirstName = res.data.data[0].firstName;
        this.LastName = res.data.data[0].lastName;
        this.Username = res.data.data[0].username;
        this.Pic = res.data.data[0].pic;
        this.Birthday = res.data.info[0].date;
        this.Gender = res.data.info[0].gender;
        this.SexualP = res.data.info[0].sexualPref;
        this.Bio = res.data.info[0].bio;
        this.rating = res.data.rating[0].fameRating;
        let i = 0;
        while (res.data.tags[i])
        {
            this.Tags[i] = res.data.tags[i].tag;
            i++;
        };
    })
    .catch(err => console.log(err))
  },
};
</script>