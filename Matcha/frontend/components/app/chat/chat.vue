<template>
  <div class="container">
    <div class="messaging">
      <div class="inbox_msg">
        <!-- Part li fliser web -->
        <div class="inbox_people hidden-sm-and-down">
          <!-- Bar (Recent And Search) -->
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
          </div>
          <!-- List Friends -->
          <div class="inbox_chat">
            <div v-for="(btn, index) in btns" :key="index" class="chat_list active_chat">
              <div class="chat_people" @click="ft_chat(btn.id)">
                <div class="chat_img">
                  <v-avatar>
                    <img :src="btn.img" />
                  </v-avatar>
                </div>
                <div class="chat_ib">
                  <h5 class="mt-3">
                    {{ btn.username }}
                    <span class="chat_date">{{ btn.conn }}</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Part dyal msgs (limen) web -->
        <div class="mesgs hidden-sm-and-down">
          <!-- MSGS -->
          <div class="msg_history">
            <!-- OLD MESSAGES -->
            <div v-for="(msg) in msgs" :key="msg.msgid">
              <!-- MY MSGS -->
              <template v-if="msg.id == myid">
                <div class="outgoing_msg mb-6">
                  <div class="sent_msg">
                    <p>{{ msg.text }}</p>
                    <span class="time_date">{{ msg.time }}</span>
                  </div>                  
                </div>
              </template>
              <!-- YOUR MSGS -->
              <template v-else>
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    <v-avatar size="34">
                      <img :src="msg.img" />
                    </v-avatar>
                  </div>
                  <div class="received_msg mb-6">
                    <div class="received_withd_msg">
                      <p>{{ msg.text }}</p>
                      <span class="time_date">{{ msg.time }}</span>
                    </div>
                  </div>                  
                </div>
              </template>
            </div>
            <!-- SOCKET MESSAGES -->
            <div v-if="yourid">
            <div v-for="(msg) in allMsgs" :key="msg.msgid">
                <!-- MY MSGS -->
                <template v-if="msg.id == myid">
                  <div v-if="msg.other == yourid">
                    <div class="outgoing_msg mb-6">
                      <div class="sent_msg">
                        <p>{{ msg.text }}</p>
                        <span class="time_date">{{ msg.time }}</span>
                      </div>     
                    </div>
                  </div>
                </template>
                <!-- YOUR MSGS -->
                <template v-if="msg.id == yourid">
                    <div class="incoming_msg">
                      <div class="incoming_msg_img">
                        <v-avatar size="34">
                          <img :src="msg.img" />
                        </v-avatar>
                      </div>
                      <div class="received_msg mb-6">
                        <div class="received_withd_msg">
                          <p>{{ msg.text }}</p>
                          <span class="time_date">{{ msg.time }}</span>
                        </div>
                      </div>                  
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- Text And Send Btn -->
          <div class="type_msg">
            <div class="input_msg_write">
              <v-form ref="sendd">
                <template v-if="yourid">
                  <v-text-field v-model="msg" class="write_msg" filled></v-text-field>
<!--                   <input v-model="msg" type="text" class="write_msg" placeholder="Type a message" /> -->
                  <v-btn icon class="msg_send_btn" @click="ft_send">
                    <v-icon color="white">mdi-send</v-icon>
                  </v-btn>                    
                </template>
              </v-form>
            </div>
          </div>
        </div>
        <!-- Part li fliser mobile -->
        <div class="hidden-md-and-up">
          <!-- Bar (Recent And Search) -->
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
          </div>
          <!-- List Friends -->
          <div class="inbox_chat">
            <div v-for="(btn, index) in btns" :key="index" class="chat_list active_chat">
              <div class="chat_people" @click="ft_chat(btn.id)">
                <div class="chat_img">
                  <v-avatar>
                    <img :src="btn.img" />
                  </v-avatar>
                </div>
                <div class="chat_ib">
                  <h5 class="mt-3 ml-6">
                    {{ btn.username }}
                    <span class="chat_date">{{ btn.conn }}</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <!-- Part dyal msgs (limen) mobile -->
        <div class="hidden-md-and-up">
          <!-- MSGS -->
          <div class="msg_history">
            <!-- OLD MESSAGES -->
            <div v-for="(msg) in msgs" :key="msg.msgid">
              <!-- MY MSGS -->
              <template v-if="msg.id == myid">
                <div class="outgoing_msg mb-6">
                  <div class="sent_msg">
                    <p>{{ msg.text }}</p>
                    <span class="time_date">{{ msg.time }}</span>
                  </div>                  
                </div>
              </template>
              <!-- YOUR MSGS -->
              <template v-else>
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    <v-avatar size="34">
                      <img :src="msg.img" />
                    </v-avatar>
                  </div>
                  <div class="received_msg mb-6">
                    <div class="received_withd_msg">
                      <p>{{ msg.text }}</p>
                      <span class="time_date">{{ msg.time }}</span>
                    </div>
                  </div>                  
                </div>
              </template>
            </div>
            <!-- SOCKET MESSAGES -->
            <div v-if="yourid">
            <div v-for="(msg) in allMsgs" :key="msg.msgid">
                <!-- MY MSGS -->
                <template v-if="msg.id == myid">
                  <div v-if="msg.other == yourid">
                    <div class="outgoing_msg mb-6">
                      <div class="sent_msg">
                        <p>{{ msg.text }}</p>
                        <span class="time_date">{{ msg.time }}</span>
                      </div>     
                    </div>
                  </div>
                </template>
                <!-- YOUR MSGS -->
                <template v-if="msg.id == yourid">
                    <div class="incoming_msg">
                      <div class="incoming_msg_img">
                        <v-avatar size="34">
                          <img :src="msg.img" />
                        </v-avatar>
                      </div>
                      <div class="received_msg mb-6">
                        <div class="received_withd_msg">
                          <p>{{ msg.text }}</p>
                          <span class="time_date">{{ msg.time }}</span>
                        </div>
                      </div>                  
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- Text And Send Btn -->
          <div class="type_msg">
            <div class="input_msg_write">
              <v-form ref="sendd">
                <template v-if="yourid">
                  <input v-model="msg" type="text" class="write_msg" placeholder="Type a message" />
                  <v-btn icon class="msg_send_btn" @click="ft_send">
                    <v-icon color="white">mdi-send</v-icon>
                  </v-btn>                    
                </template>
              </v-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {mapActions, mapGetters} from 'vuex';

export default {
  computed: mapGetters(["allMsgs", "token"]),
  sockets: {
      connect: function () {
      }
  },
  data() {
    return {
      btns: [],
      msgs: [],
      msg: "",
      myid: "",
      yourid: "",
      image: "",
    };
  },
  methods: {
    ft_chat(id) {
      this.yourid = id;
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.id = id;
      obj.tmp = tmp;

    axios
      .post("http://localhost:6937/chat/getimage", obj)
      .then(data => {
        if (data.data == "Logout") {
          this.$cookies.removeAll();
          this.$router.push("/");
        }
        this.image = data.data;
      })
      .catch(err => console.log(err));


    axios
      .post("http://localhost:6937/chat/datamsg", obj)
      .then(data => {
        if (data.data == "Logout") {
          this.$cookies.removeAll();
          this.$router.push("/");
        }
        let tmp = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          tmp.push({
            text: element.msg,
            img: element.img,
            msgid: element.id,
            id: element.id_send,
          });
        }
        this.msgs = tmp;
        this.sortBy('msgid');
      })
      .catch(err => console.log(err));
    },

    async ft_send() {
      this.$refs.sendd.reset()
      this.$socket.emit('chat', {
        id: this.$cookies.get("token"),
        img: this.image,
        other: this.yourid,
        text: this.msg,
      })
      this.$socket.emit('notification', {
        id: this.yourid
      })
      const tmp = this.$cookies.get("token");
      const obj = {};
      obj.id = this.yourid;
      obj.tmp = tmp;
      obj.msg = this.msg;
   axios
      .post("http://localhost:6937/chat/sendmsg", obj)
       .then(data => {
        if (data.data == "Logout") {
          this.$cookies.removeAll();
          this.$router.push("/");
        }
      })
      .catch(err => console.log(err));
    },
    sortBy(prop) {
      this.msgs.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    },
    reset () {
      this.$refs.sendd.reset()
    },
  },
  mounted() {
    this.sortBy('msgid');
    const tmp = this.$cookies.get("token");
    const obj = { tmp: tmp };
    axios
      .post("http://localhost:6937/match/friends", obj)
      .then(data => {
        if (data.data == "Logout") {
          this.$cookies.removeAll();
          this.$router.push("/");
        }
        let tmp = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          tmp.push({
            username: element.username,
            img: element.pic,
            id: element.id,
            conn: element.conn,
          });
        }
        this.btns = tmp;
        this.myid = data.data[0].myid
      })
      .catch(err => console.log(err));
  }
};
</script>
<style scoped>
.container {
  max-width: 1170px;
  margin: auto;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}
.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}
.recent_heading h4 {
  color: #e0234e;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}
.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}
.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}
.active_chat {
  background: #ebebeb;
}
.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}
.sent_msg p {
  background: #e0234e none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}
.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: #e0234e none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>