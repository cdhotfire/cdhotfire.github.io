import localStorage from 'localStorage';

import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';

const ordertabs = (tabs) => {
    const mapped = map(tabs,
	   (tab, key) => {
		  return { key: key, tab: tab };
	   });
    const filtered = filter(mapped, item => item.tab);
    const sorted = sortBy(filtered, item => item.tab.Order);

    var result = {};
    for (const index in sorted) {
	   if (sorted[index].tab.Children)
		  sorted[index].tab.Children = ordertabs(sorted[index].tab.Children);

	   result[sorted[index].key] = sorted[index].tab;
    }

    return result;
};

export default {
    state: {
	   token: {},
	   loading: false,
	   printing: false,
	   recaptcha: {
		  sitekey: '',
		  required: false,
	   },
	   showlogin: true,
	   version: Math.floor(Math.random() * 10),
	   validationmethod: 2,
	   tabs: {},
	   validationErrors: {
		  custom: {
			 poolid: {
				required: 'Pool ID is required.',
				numeric: 'Not a valid Pool ID.',
				min_value: 'Pool ID must be greater than 0.',
			 },
			 jurornumber: {
				required: 'Juror Number is required',
				numeric: 'Not a valid Juror Number.',
				min_value: 'Juror Number must be greater than 0.',
			 },
			 firstname: {
				required: 'First Name is required.',
			 },
			 lastname: {
				required: 'Last Name is required.',
			 },
			 email: {
				required: 'Email Address is required.',
				email: 'Email Address is invalid.',
				is: 'Email Address does not match.',
			 },
			 confirmemail: {
				required: 'Email Address is required.',
				email: 'Email Address is invalid.',
			 },
			 phonenumber: {
				required: 'Phone Number is required.',
				phonenumber: 'Phone Number is invalid.',

			 },
			 dlnumber: {
				required: "Driver's License Number is required.",
			 },
			 recaptcha: {
				required: 'ReCaptcha is required.',
			 },
		  },
	   },
    },
    getters: {
	   authenticated: state => state.token.loggedin == "true",
	   editaccess: state => state.token.edit == "true",
	   calendaraccess: state => state.token.calendaraccess == "true",
	   expiredsession: state => !state.token || !state.token.refresh_token || !state.token.access_token,
    },
    mutations: {
	   printing: (state) => {
		  state.printing = true;
	   },
	   printed: (state) => {
		  state.printing = false;
	   },
	   loading: (state) => {
		  state.loading = true;
	   },
	   loaded: (state) => {
		  state.loading = false;
	   },
	   login: (state, data) => {
		  state.token = data;
	   },
	   logout: (state) => {
		  state.token = {};
	   },
	   settabs: (state, tabs) => {
		  state.tabs = ordertabs(tabs);
	   },
	   setversion: (state, version) => {
		  state.version = version;
	   },
	   setvalidationmethod: (state, method) => {
		  state.validationmethod = method;
	   },
	   updatetab: (state, tab) => {
		  var t;

		  if (tab.parent)
			 t = state.tabs[tab.parent].Children[tab.tab];
		  else
			 t = state.tabs[tab.tab];

		  t.Text = tab.value;
		  t.Order = tab.order;

		  state.tabs = ordertabs(state.tabs);
	   },
	   setrecaptcha: (state, data) => {
		  state.recaptcha.sitekey = data.sitekey;
		  state.recaptcha.required = data.required;
	   },
	   setshowlogin: (state, data) => {
		  state.showlogin = data;
	   }
    },
    actions: {
	   login(_, token) {
		  localStorage.setItem('user-token', JSON.stringify(token));
		  this._vm.axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
		  this.commit('login', token);
	   },
	   refreshlogin(store, token) {
		  store.state.token = token;
		  store.commit('login', this.state.token);
		  localStorage.setItem('user-token', JSON.stringify(store.state.token));
	   },
	   logout() {
		  localStorage.removeItem('user-token');
		  delete this._vm.axios.defaults.headers.common.Authorization;
		  this.commit('logout');
	   },
	   expiredsession(_, router) {
		  swal('Session Timeout', 'Your session has timed out, you will be taken to the login page.', 'warning');
		  this.dispatch('logout');
		  router.push({ path: '/login' });
	   },
	   setlogin() {
		  try {
			 const token = JSON.parse(localStorage.getItem('user-token')) || null;
			 if (token) {
				this.commit('login', token);
				this._vm.axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
			 }
		  } catch (e) {
			 localStorage.removeItem('user-token');
		  }
	   },
    },
};
