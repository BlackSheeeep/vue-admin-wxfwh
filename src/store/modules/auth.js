const auth = {
  state: {
    authorisiert: false,
    keyCloak: null,
    token: null
  },

  // getters: {
  //   getTest: state => {
  //     return state.authorisiert
  //   },
  //   getKeyCloak: state => {
  //     return state.keyCloak
  //   }
  // },

  mutations: {
    setAuth: (state, authstate) => {
      // state.authorisiert = authstate.authenticated
      localStorage.setItem('member_manage_authenticated', authstate.authenticated)
      state.authorisiert = authstate.authenticated
    },
    setToken: (state, authstate) => {
      // state.authorisiert = authstate.authenticated
      localStorage.setItem('member_manage_token', authstate.token)
      state.token = authstate.token
    },
    setKeyCloak: (state, authstate) => {
      localStorage.setItem('member_manage_keyCloak', JSON.stringify(authstate))
      state.keyCloak = authstate
    },
    keyCloakLogout: state => {
      localStorage.removeItem('member_manage_authenticated')
      localStorage.removeItem('member_manage_token')
      localStorage.removeItem('member_manage_keyCloak')
      state.authorisiert = false
      state.token = ''
      state.keyCloak = null
    }
  },

  actions: {
    checkStore: ({ commit }) => {
      console.log('checkStore Action triggered')
      // state.commit('setAuth');
    },
    setAuthLogin: ({ commit }, auth) => {
      console.log('authorisiert====' + auth)
      commit('setAuth', auth)
    },
    setToken: ({ commit }, auth) => {
      // state.authorisiert = authstate.authenticated
      commit('setToken', auth)
    },
    setKeyCloak: ({ commit }, auth) => {
      commit('setKeyCloak', auth)
    },
    keyCloakLogout: ({ commit }) => {
      commit('keyCloakLogout')
    }
  }
}

export default auth
