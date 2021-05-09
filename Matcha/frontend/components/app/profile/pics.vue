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
            <v-carousel cycle height="300" :show-arrows="false" :hide-delimiters="true" >
                <v-carousel-item v-for="(image, i) in img" :key="i">
                <v-img :src="img[i]" height="100%"></v-img>
                </v-carousel-item>
            </v-carousel>
            <v-btn color="primary" v-on="on" width="100%">Change</v-btn>
        </template>
    <!-- Modal Content -->
        <v-card color="accent">
            <v-card-title class="pb-2">
                <v-toolbar-title>Change images</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon depressed slot="activator" v-on:click="dialog = !dialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="pt-2">
                <v-form v-model="valid">
                    <div>
                        <v-img :src="images[0].path1"></v-img>
                        <v-row class="mt-10 pb-3" cols="12" xs="6" sm="8" md="6" lg="6" xl="6">
                            <v-col>
                                <v-file-input :rules="rules" v-model="image" accept="image/png, image/jpeg, image/jpg"
                                    placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar">
                                </v-file-input>
                            </v-col>
                            <v-col>
                                <v-btn style="float: right" outlined color="primary" class="mt-4" :disabled="!valid"  @click="() => ft_pic(1)">
                                    <v-icon left>mdi-check-bold</v-icon>SAVE
                                </v-btn>
                            </v-col>
                        </v-row>                        
                    </div>
                    <div>
                        <v-img :src="images[1].path2"></v-img>
                        <v-row class="mt-10 pb-3" cols="12" xs="6" sm="8" md="6" lg="6" xl="6">
                            <v-col>
                                <v-file-input :rules="rules" v-model="image" accept="image/png, image/jpeg, image/jpg"
                                    placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar">
                                </v-file-input>
                            </v-col>
                            <v-col>
                                <v-btn style="float: right" outlined color="primary" class="mt-4" :disabled="!valid"  @click="() => ft_pic(2)">
                                    <v-icon left>mdi-check-bold</v-icon>SAVE
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div>
                        <v-img :src="images[2].path3"></v-img>
                        <v-row class="mt-10 pb-3" cols="12" xs="6" sm="8" md="6" lg="6" xl="6">
                            <v-col>
                                <v-file-input :rules="rules" v-model="image" accept="image/png, image/jpeg, image/jpg"
                                    placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar">
                                </v-file-input>
                            </v-col>
                            <v-col>
                                <v-btn style="float: right" outlined color="primary" class="mt-4" :disabled="!valid"  @click="() => ft_pic(3)">
                                    <v-icon left>mdi-check-bold</v-icon>SAVE
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div>
                        <v-img :src="images[3].path4"></v-img>
                        <v-row class="mt-10 pb-3" cols="12" xs="6" sm="8" md="6" lg="6" xl="6">
                            <v-col>
                                <v-file-input :rules="rules" v-model="image" accept="image/png, image/jpeg, image/jpg"
                                    placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar">
                                </v-file-input>
                            </v-col>
                            <v-col>
                                <v-btn style="float: right" outlined color="primary" class="mt-4" :disabled="!valid"  @click="() => ft_pic(4)">
                                    <v-icon left>mdi-check-bold</v-icon>SAVE
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
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
        rules: [
            value => !!value || 'Avatar is required',
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        img: [
                "https://images.unsplash.com/photo-1513344756488-b273726a3da6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
                "https://images.unsplash.com/photo-1560790171-17a7cd9f55d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
                "https://images.unsplash.com/photo-1515353719550-cf04906a258c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
                "https://images.unsplash.com/photo-1489189642444-0709966aec44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        ],
        images: [
            {
                path1: "https://images.unsplash.com/photo-1513344756488-b273726a3da6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
            },
            {
                path2: "https://images.unsplash.com/photo-1560790171-17a7cd9f55d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
            },
            {
                path3: "https://images.unsplash.com/photo-1515353719550-cf04906a258c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
            },
            {
                path4: "https://images.unsplash.com/photo-1489189642444-0709966aec44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
            },
        ],
        image_id: "",
        image: [],
        register: {},
        valid: true,
        dialog: false,
        snackbar: false,
        timeout: 8000,
        status: "login",
        text: '',
    };
  },
  methods: {
    ft_pic: async function(id) {
        const respons = await this.pic_req(id);
        this.snackbar = true;
        this.text = respons.res.data.msg;
    },
    pic_req: async function(id) {
        const formData = new FormData();
        formData.append('file', this.image);
        const tmp = this.$cookies.get('token');
        formData.append('tmp', tmp);
        formData.append('image_id', id);
        try {
            return await axios.post('http://localhost:6937/profile/images', formData)
            .then((res) => {
                if (res.data == "Logout")
                {
                    this.$cookies.removeAll();
                    this.$router.push("/");
                }
                this.path = res.data;
                return { res }
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
    axios.post('http://localhost:6937/profile/imageData', obj)
    .then((res) => {
        if (res.data == "Logout")
        {
            this.$cookies.removeAll();
            this.$router.push("/");
        }
        this.images[0].path1 = res.data[0].image;
        this.images[1].path2 = res.data[1].image;
        this.images[2].path3 = res.data[2].image;
        this.images[3].path4 = res.data[3].image;
        /////////////////////////////////////////
        this.img[0] = res.data[0].image;
        this.img[1] = res.data[1].image;
        this.img[2] = res.data[2].image;
        this.img[3] = res.data[3].image;
    })
    .catch(err => console.log(err))
  },
};
</script>