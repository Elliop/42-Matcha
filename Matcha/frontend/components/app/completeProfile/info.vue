<template>
    <v-row>
        <v-col cols="12" xl="4" lg="4" md="4" v-if="!path">
            <v-form v-model="valid2">
                <v-card color="accent">
                    <v-row style="margin: 2vh 0 0 0; padding: 1vh">
                    <v-file-input :rules="rules" v-model="image" accept="image/png, image/jpeg, image/jpg" 
                    placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar"></v-file-input> 
                    </v-row>
                    <v-btn color="primary" @click="ft_pic" width="90%" style="margin: 0 1vh 1vh 1vh;" v-if="v == ``" :disabled="!valid2">Save</v-btn>                    
                </v-card>
            </v-form>
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" v-if="path">
            <center>
                <v-avatar size="250" class="pink darken-3 mt-6" align="center" justify="center">
                    <img :src="path" />
                </v-avatar>                
            </center>
        </v-col>
        <v-col cols="12" xl="8" lg="8" md="8" v-if="v == `valid`">
            <v-form v-model="valid">
                <v-card color="accent">
                    <v-row style="margin: 4vh 0 0 0">
                        <v-col>
                            <v-date-picker min="1925" max="2004" color="primary" v-model="date" width="290" class="ml-6 my-12"></v-date-picker>
                        </v-col>
                        <v-col style="margin: 4vh 0 0 0">
                            <v-select v-model="complete.gender" :items="Gender" label="Gender" outlined style="margin: 0 1vh 0 1vh" :rules="GenderRules"></v-select>
                            <v-select v-model="complete.sexualPref" :items="Sexual" label="Sexual preferences" outlined style="margin: 0 1vh 0 1vh" :rules="SexualRules"></v-select>
                        </v-col>            
                    </v-row>
                    <v-row  style="margin: 2vh 0 0 0">
                        <v-container fluid>
                            <v-combobox v-model="model" :items="items" :search-input.sync="search" hide-selected label="Add some tags" multiple persistent-hint small-chips :rules="TagsRules"></v-combobox>
                        </v-container>
                    </v-row>
                    <v-row  style="margin: 2vh 0 0 0">
                        <v-textarea v-model="complete.bio" label="Bio" outlined style="margin: 0 1vh 0 1vh" :rules="BioRules"></v-textarea>
                    </v-row>
                    <v-row  style="margin: 2vh 0 0 0" v-if="valid">
                        <n-link to="/profile"><v-btn color="primary" @click="ft_compete" width="100%" style="margin: 0 1vh 1vh 1vh" :disabled="!valid">Save</v-btn></n-link>
                    </v-row>                    
                </v-card>

            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
  export default {
    data: () => ({
        v: "",
        path: "",
        valid2: true,
        valid: true,
        complete: {},
        Gender: ['Female', 'Male',],
        Sexual: ['Female', 'Male', 'All'],
        items: ['PHP', 'JavaScript', 'C', 'Python'],
        search: null,
        date: "1999-01-01",
        model: [],
        location:null,
        gettingLocation: false,
        errorStr:null,
                rules: [
                    value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
                    value => !!value || 'Avatar is required',
                ],
                image: [],
                file: "",
                message: "",
                error: false,
      ///// Rules /////
      GenderRules: [
        v => !!v || 'Gender is required',
      ],
      SexualRules: [
        v => !!v || 'Sexual preferences is required',
      ],
      BioRules: [
        v => !!v || 'Bio is required',
        v => (v && v.length >= 5) || 'Bio must be more than 5 characters',
        v => (v && v.length <= 50) || 'Bio must be less than 50 characters',
      ],
      TagsRules: [
        v => (v && v.length != 0) || 'Tags is required',
      ],
    }),
    methods: {
        ft_compete: async function() {
            const respons = await this.compete_req();
            this.$router.push("/profile");
        },
        compete_req: async function() {
            const tmp = this.$cookies.get('token')
            this.complete.tags = this.model;
            this.complete.date = this.date;
            this.complete.tmp = tmp;
            return axios.post('http://localhost:6937/comp/complete', this.complete)
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
                            console.log(err)
                            this.error = true;
                        }
                    },
    },
}
</script>