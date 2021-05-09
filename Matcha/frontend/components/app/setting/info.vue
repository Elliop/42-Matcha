<template>
    <v-col>
        <!-- Snack Bar -->
            <div class="text-center">
            <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}
                <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            </div>
        <!-- Modal activator -->
        <v-card color="accent">
            <v-form v-model="valid">
                <v-row style="margin: 4vh 0 0 0; padding: 2vh 0 0 0;">
                    <v-text-field v-model="FirstName" outlined label="First Name" type="text" required :rules="FirstNameRules" style="margin: 0 1vh 0 1vh"></v-text-field>
                    <v-text-field v-model="LastName" outlined label="Last Name" type="text" required :rules="LastNameRules" style="margin: 0 1vh 0 1vh"></v-text-field>
                    <v-text-field v-model="Username" outlined label="Username" type="text" required :rules="usernameRules" style="margin: 0 1vh 0 1vh"></v-text-field>
                </v-row>
                <v-row style="margin: 2vh 0 0 0">
                        <v-select v-model="Gender" :items="GenderI" label="Gender" outlined :rules="GenderRules" style="margin: 0 1vh 0 1vh"></v-select>
                        <v-select v-model="SexualP" :items="SexualI" label="Sexual preferences" outlined :rules="SexualRules" style="margin: 0 1vh 0 1vh"></v-select>     
                </v-row>
                <v-row  style="margin: 2vh 0 0 0">
                    <v-container fluid>
                        <v-combobox eager v-model="Tags" :items="items" :search-input.sync="search" hide-selected label="Add some tags" multiple persistent-hint small-chips :rules="TagsRules"></v-combobox>
                    </v-container>
                </v-row>
                <v-row  style="margin: 2vh 0 0 0">
                    <v-textarea v-model="Bio" label="Bio" outlined style="margin: 0 1vh 0 1vh" :rules="BioRules"></v-textarea>
                </v-row>
                <v-row style="margin: 2vh 0 0 0">
                    <v-text-field v-model="Password" outlined label="Password" type="password" required :rules="passwordRules" style="margin: 0 1vh 0 1vh"></v-text-field>
                </v-row>
                <v-row  style="margin: 2vh 0 0 0; padding: 0 0 2vh 0;">
                    <v-btn color="primary" @click="ft_update" width="95%" style="margin: 0 1vh 0 1vh" :disabled="!valid">Save</v-btn>
                </v-row>
            </v-form>            
        </v-card>

    </v-col>
</template>

<script>
import geolocation from "geolocation";
import axios from "axios";
  export default {
    data: () => ({
        snackbar: false,
        timeout: 8000,
        text: '',
        valid: true,
        GenderI: ['Female', 'Male',],
        SexualI: ['Female', 'Male', 'All'],
        items: ['PHP', 'JavaScript', 'C', 'Python'],
        search: null,
        ///// Default /////
        FirstName: "",
        LastName: "",
        Username: "",
        Gender: "",
        SexualP: "",
        Pic: "",
        Bio: "",
        Tags: [],
        Password: "",
        i: 0,
        ///// Rules /////
        FirstNameRules: [
            v => !!v || 'First Name is required',
            v => (v && v.length <= 20) || 'First Name must be less than 20 characters',
        ],
        LastNameRules: [
            v => !!v || 'Last Name is required',
            v => (v && v.length <= 20) || 'First Name must be less than 20 characters',
        ],
        usernameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length <= 15) || 'Username must be less than 15 characters',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length > 8) || 'Password must be more than 8 characters',
            v => /[A-Z]/.test(v) || 'Password must be valid',
            v => /[a-z]/.test(v) || 'Password must be valid',
            v => /[0-9]/.test(v) || 'Password must be valid',
        ],
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
        ft_update: async function() {
            const respons = await this.update_req();
            this.snackbar = true;
            this.text = respons.res.data.msg;
        },
        update_req: async function() {
            const tmp = this.$cookies.get('token');
            const FirstName = this.FirstName;
            const LastName = this.LastName;
            const Username = this.Username;
            const Gender = this.Gender;
            const SexualP = this.SexualP;
            const Bio = this.Bio;
            const Tags = this.Tags;
            const Password = this.Password;
            const obj = {FirstName, LastName, Username, Gender, SexualP, Bio, Password, Tags, tmp};
            return axios.post('http://localhost:6937/set/info', obj)
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
            this.FirstName = res.data.data[0].firstName;
            this.LastName = res.data.data[0].lastName;
            this.Username = res.data.data[0].username;
            this.Pic = res.data.data[0].pic;
            this.Birthday = res.data.info[0].date;
            this.Gender = res.data.info[0].gender;
            this.SexualP = res.data.info[0].sexualPref;
            this.Bio = res.data.info[0].bio;
            let i = 0;
            while (res.data.tags[i])
            {
                this.Tags[i] = res.data.tags[i].tag;
                i++;
            };
        })
        .catch(err => console.log(err))
    },
}
</script>