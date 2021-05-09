<template>
    <nav>
        <v-toolbar dense color="accent">
            <v-spacer></v-spacer>
            <!-- Copyright -->
            <span class="secondary--text">Copyright © 2019</span>
            <v-spacer></v-spacer>
            <!-- invert-colors -->
             <v-toolbar-items v-model="dark">
                <v-btn icon depressed @click="col" v-on:click="dark = !dark"><v-icon color="secondary">mdi-invert-colors</v-icon></v-btn>
             </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
  data() {
    return {
        dark: false,
    };
  },
  methods: {
      col: function() {
          this.$vuetify.theme.dark = this.dark;
      },
  }
};
</script>