import $ from 'jquery';

export default {
    model(t) {
	   return t.$http.get("api/login/model");
    },
    login(t, request) {
	   return t.$http.post("token", $.param(request), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    },
    checkLogin(store, axios, router) {
	   if (store.getters.expiredsession) {
		  store.dispatch('expiredsession', router);
		  return;
	   }

	   axios.post("token", "grant_type=refresh_token&refresh_token=" + store.state.token.refresh_token, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
		  .then(result => {
			 if (result)
				store.dispatch('refreshlogin', result.data);
		  });
    }
};