export const state = () => ({
  Uid: "",
  msgs: [],
  token: "",
  notif: 0,
})

export const mutations = {
  setUid (state, uid) {
    state.Uid = uid
  },
  setMsg (state, new_msg) {
    state.msgs.push(new_msg);
    state.msgs[0].msgid++;
  },
  setToken (state, token) {
    state.token = token;
  },
  setNotif (state, num) {
    state.notif += num;
  }
}

export const actions = {
  SOCKET_newMessage({ commit }, new_msg) {
    commit('setMsg', new_msg);
  },
  SOCKET_notification({ commit }) {
    commit('setNotif', 1);
  },
  setNotification({commit}, num) {
    commit('setNotif', num)
  },
  SetToken({commit}, token){
    commit('setToken', token);
  }
}

export const getters = {
  allMsgs: state => state.msgs,
  token: state => state.token,
  notif: state => state.notif
}