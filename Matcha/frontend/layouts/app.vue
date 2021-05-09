<template>
    <v-app>
        <Appbar />
        <v-content>
            <v-container fluid>
                <nuxt />
            </v-container>
        </v-content>
        <Footer />
    </v-app>
</template>

<script>
import Appbar from "~/components/app/Appbar";
import Footer from "~/components/website/Footer";

export default {
    components: { Appbar, Footer }
};
</script>

<style>
a {
    text-decoration: none;
}
</style>