<template>
  <v-carousel cycle height="100%" :show-arrows="false" :hide-delimiters="true">
    <v-carousel-item v-for="(image, i) in images" :key="i">
      <v-img :src="images[i]" height="100%"></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        images: [
                "https://images.unsplash.com/photo-1513344756488-b273726a3da6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
                "https://images.unsplash.com/photo-1560790171-17a7cd9f55d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
                "https://images.unsplash.com/photo-1515353719550-cf04906a258c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
                "https://images.unsplash.com/photo-1489189642444-0709966aec44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
                "https://images.unsplash.com/photo-1511405889574-b01de1da5441?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
                "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80",
                ]
      }
    },
  }
</script>