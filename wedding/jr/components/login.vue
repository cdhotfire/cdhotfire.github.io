<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebLoginPageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebLoginPageBody">
        </quill-editor>
        <div v-if="!$store.getters.authenticated">
            <div class="row justify-content-sm-center">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="form-control-label" :class="{ 'text-danger': errors.has('username') }">
                            Username
                            <input class="form-control" @keyup="checksubmit" placeholder="Username" type="text" v-validate="'required'" name="username" v-model="formData.username" :class="{ 'is-invalid': errors.has('username') }" />
                        </label>
                        <small v-if="errors.has('username')" class="help-block text-danger">{{errors.first('username')}}</small>
                    </div>
                </div>
            </div>
            <div class="row justify-content-sm-center">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="form-control-label" :class="{ 'text-danger': errors.has('password') }">
                            Password
                            <input class="form-control" @keyup="checksubmit" placeholder="Password" v-validate="'required'" type="password" name="password" v-model="formData.password" :class="{ 'is-invalid': errors.has('password') }" />
                        </label>

                        <small v-if="errors.has('password')" class="help-block text-danger">{{errors.first('password')}}</small>
                    </div>
                </div>
            </div>
            <div class="row justify-content-sm-center">
                <div class="col-sm-4 text-center">
                    <b-button :disabled="errors.any() || processing" variant="primary" size="lg" @click="validateForm">
                        <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                        Login
                    </b-button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row justify-content-sm-center">
                <div class="col-sm-4 text-center">
                    <h4>
                        {{$store.state.token.username}}
                    </h4>
                    <b-button :variant="'danger'" size="lg" @click="logout">Logout</b-button>
                </div>
            </div>
            <div class="mt-3" v-if="$store.getters.editaccess">
                <div class="mb-3 text-center">
                    <b-button variant="primary" size="lg" @click="clearcache">Clear Cache</b-button>
                </div>
                <h5 class="mb-2 text-center">Tabs</h5>
                <div v-for="(tab, i) in $store.state.tabs">
                    <tabsettingitem :key="i" :tab="i" :setting="tab.Setting" :val="tab.Text" :ord="tab.Order" @child="showchildren[i] = !showchildren[i]" :haschild="tab.Children != null"></tabsettingitem>
				<transition name="transition">
				    <div class="ml-2 alert" v-if="tab.Children && showchildren[i]">
				        <tabsettingitem v-for="(subtab, j) in tab.Children" :key="j" :tab="j" :setting="subtab.Setting" :val="subtab.Text" :ord="subtab.Order" :parent="subtab.Parent"></tabsettingitem>
				    </div>
				</transition>
                </div>
                <h5 class="mb-2 mt-4 text-center">IVR</h5>
                <lookupitem listname="IVR" lookup="SystemStopMessage" :val="model.SystemStopMessage"></lookupitem>
            </div>
        </div>
    </div>
</template>
<script>
    import tabsettingitem from 'components/plugins/tabsettingitem.vue';
    import lookupitem from 'components/plugins/lookupitem.vue';
    import loginService from "services/login";
    import globalService from 'services/global';

    export default {
	   data() {
		  return {
			 model: { Editable: true },
			 formData: {
				username: "",
				password: "",
				grant_type: "password"
			 },
			 processing: false,
			 validationErrors: {
				custom: {
				    username: {
					   required: "Username is required.",
				    },
				    password: {
					   required: "Password is required.",
				    }
				}
			 },
			 showchildren: {
				Home: false,
				Excusal: false
			 }
		  };
	   },
	   components: { tabsettingitem, lookupitem },
	   methods: {
		  checksubmit(e) {
			 if (e.keyCode === 13)
				this.validateForm();
		  },
		  validateForm() {
			 this.$validator.validateAll().then(result => {
				if (result && !this.processing) {
				    this.processing = true;

				    loginService
					   .login(this, this.formData)
					   .catch(error => {
						  swal("Login Error", error.response.data.error_description, "error");
						  this.$store.dispatch('logout');
					   })
					   .then(result => {
						  if (result) {
							 this.$store.dispatch('login', result.data);
						  }
					   })
					   .finally(() => this.processing = false);
				}
			 });
		  },
		  logout() {
			 this.$store.dispatch('logout');
		  },
		  clearcache() {
			 globalService.clearcache(this).then(() => swal("Cache", "Cache has been cleared", "success"));
		  }
	   },
	   mounted() {
		  this.$validator.localize("en", this.validationErrors);
	   },
	   beforeCreate() {
		  loginService.model(this).then(result => {
			 this.model = result.data;
			 this.$store.commit('loaded');
		  });
	   }
    }
</script>