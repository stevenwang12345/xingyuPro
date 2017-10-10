export default {
  namespace: 'common',
  state: {
  	userInfo: {
  		profile: "",
      nickName: "",
      signature: "",
      phone: ""
  	}
  },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    logout(state, action) {
       return { ...state, ...action.payload };
    }
  },
  subscriptions: {

  },

  effects: {

  },



};
