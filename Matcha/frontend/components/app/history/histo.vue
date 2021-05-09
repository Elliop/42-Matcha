<template>
  <v-card color="accent" width="100%" height="100%">
    <v-col v-for="item in items" :key="item.id">
        <v-row>
            <v-card style="margin: 1vh" width="100%">
                <v-card-text align="center">
                    <span class="headline">{{ item.act }}</span>
                </v-card-text>
            </v-card>
        </v-row> 
    </v-col>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        items: []
    };
  },
  mounted() {
    const tmp = this.$cookies.get("token");
    const obj = { tmp: tmp };
    axios
      .post("http://localhost:6937/history/historyData", obj)
      .then(data => {
        if (data.data == "Logout")
        {
            this.$cookies.removeAll();
            this.$router.push("/");
        }
        let tmp = [];
        let index = data.data.length
        index--
        for (index; index >= 0; index--) {
          const element = data.data[index];
          tmp.push({
            act: element.act,
            id: element.id,
          });
        }
        this.items = tmp;
      })
      .catch(err => console.log(err));
  },
};
</script>