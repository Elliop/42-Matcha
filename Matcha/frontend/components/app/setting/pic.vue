<template>
<v-col>
  <v-row>
    <v-col>
      <v-row align="center" justify="center">
        <v-avatar size="250" class="pink darken-3 mt-6" align="center" justify="center">
          <img :src="path" />
        </v-avatar>
      </v-row>
      <v-card class="px-5" color="accent">
        <v-form v-model="valid">
          <v-row class="mt-10 pb-3" cols="12" xs="6" sm="8" md="6" lg="6" xl="6">
            <v-col>
              <v-file-input :rules="rules" v-model="image" accept="image/png, image/jpeg, image/jpg"
                  placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar">
              </v-file-input>
            </v-col>
            <v-col>
              <v-btn style="float: right" outlined color="primary" class="mt-4" :disabled="!valid" @click="ft_pic">
                <v-icon left>mdi-check-bold</v-icon>SAVE
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
  <v-card class="px-5" color="accent">
    <v-row class="my-6">
        <v-col class="mt-1">
          <span class="font-weight-black">Email:</span>
        </v-col>
        <v-col class="mt-1">
          <span class="font-italic font-weight-black">{{ email.length > 15 ? email.substring(0, 15) + '...' : email }}</span>
        </v-col>
        <v-col class="mt-1">
          <editEmail />
        </v-col>
    </v-row>
  </v-card>
  <v-card class="px-5" color="accent">
    <v-row cols="12" xs="12" sm="7" md="3" lg="3" xl="1" class="my-6">
      <v-col class="mt-1">
        <span class="font-weight-black">Password:</span>
      </v-col>
      <v-col class="mt-1">
        <span class="font-weight-black">*******************</span>
      </v-col>
      <v-col class="mt-1">
        <editPassword />
      </v-col>
    </v-row>
  </v-card>
  <v-card class="px-5" color="accent">
    <v-row cols="12" xs="12" sm="7" md="3" lg="3" xl="1" class="my-6">
      <v-col class="mt-1">
        <span class="font-weight-black">Location</span>
      </v-col>
      <v-col class="mt-1">
        <editLocation />
      </v-col>
    </v-row>
  </v-card>
</v-col>


</template>

<script>
import editEmail from "./editEmail";
import editPassword from "./editPassword";
import editLocation from "./editLocation";
import axios from "axios";
export default {
  components: { editEmail, editPassword, editLocation },
  data: () => ({
    valid: true,
    email: "",
    path: "",
    image: [],
    rules: [
      value => !!value || 'Avatar is required',
      value => !value || value.size < 2000000 || "Image size should be less than 2 MB!"
    ]
  }),
  methods: {
    ft_pic: async function() {
        const respons = await this.pic_req();
    },
    pic_req: async function() {
        const formData = new FormData();
        formData.append('file', this.image);
        const tmp = this.$cookies.get('token');
        formData.append('tmp', tmp);
        try {
            await axios.post('http://localhost:6937/comp/pic', formData)
            .then((res) => {
            if (res.data == "Logout")
            {
                this.$cookies.removeAll();
                this.$router.push("/");
            }
                this.path = res.data;
            })
            .catch(err => console.log(err))
            this.v = "valid";
            this.message = "File has been uploaded";
            this.file = "";
            this.error = false;
        } catch (err) {
            this.message = "Something went wrong";
            this.error = true;
        }
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
        this.path = res.data.data[0].pic;
        this.email = res.data.data[0].email;
    })
    .catch(err => console.log(err))
  },
};
</script>