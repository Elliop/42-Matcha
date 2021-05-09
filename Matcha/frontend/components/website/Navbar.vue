<template>
    <v-app-bar color="accent" flat>
        <n-link to="/">
            <v-hover v-slot:default="{ hover }">
                <v-toolbar-title class="logo secondary--text transition-fast-in-fast-out" :style="hover ? 'font-size: 30px;' : null">
                    <v-icon class="pr-2" color="secondary" large>mdi-atom-variant</v-icon>
                    <span class="font-weight-light">MAT</span>
                    <span>CHA</span>
                </v-toolbar-title>
            </v-hover>
        </n-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="py-3">
            <ModalLogin />             
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import ModalLogin from "./ModalLogin";

export default {
    components: { ModalLogin },
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
</style>