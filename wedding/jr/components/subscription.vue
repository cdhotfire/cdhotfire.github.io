<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebSubscriptionPageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebSubscriptionPageBody">
        </quill-editor>
        <validation-section :fm.sync="formData" :emailRequired="model.WebRequireEmailAddress" :showEmail="true"></validation-section>
        <div class="row justify-content-md-center">
            <div class="col-sm-6 col-md-6 col-lg-3">
                <validation-item mask="(###) ###-####" :value.sync="formData.phonenumber" display="Phone Number" :valid="'phonenumber'" name="phonenumber"></validation-item>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
                <div class="form-group">
                    <label class="form-control-label">
                        Notifications
                    </label>
                    <div>
                        <b-form-radio-group buttons button-variant="primary" v-model="formData.notifylevel">
                            <b-form-radio value="0">None</b-form-radio>
                            <b-form-radio value="1">Email</b-form-radio>
                            <b-form-radio :disabled="nophonenumber" value="2">Text</b-form-radio>
                            <b-form-radio :disabled="nophonenumber" value="3">Email and Text</b-form-radio>
                        </b-form-radio-group>
                        <small class="text-danger" v-if="nophonenumber"><sup>(must have valid phone number to selected texting)</sup></small>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button :disabled="errors.any() || processing" class="btn btn-primary btn-lg" type="button" v-on:click="validateForm">
                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                Subscribe
            </button>
        </div>
    </div>
</template>
<script>
    import validationItem from "components/plugins/validationitem.vue";
    import phoneNumber from "awesome-phonenumber";
    import subscriptionService from "services/subscription";

    export default {
	   data() {
		  return {
			 model: {},
			 processing: false,
			 phonevalid: false,
			 formData: {
				phonenumber: "",
				notifylevel: 0,
			 },
		  };
	   },
	   computed: {
		  nophonenumber() {
			 return !this.phonevalid || !this.formData.phonenumber;
		  }
	   },
	   components: { validationItem },
	   methods: {
		  validateForm() {
			 this.$validator.validateAll().then(result => {
				if (result && !this.processing) {
				    this.processing = true;

				    subscriptionService.updateSubscription(this, this.formData).then(data => {					   
					   const iserror = data.data.indexOf("Error") >= 0;
					   swal(
						  "Subscription",
						  data.data, iserror ? "error" : "success"
					   );

					   if (iserror && this.formData.reset)
						  this.formData.reset();
				    }).finally(() => this.processing = false);
				}
			 });
		  }
	   },
	   mounted() {
		  const _this = this;
		  this.$validator.localize("en", this.$store.state.validationErrors);
		  this.$validator.extend('phonenumber',
			 (value) => {
				_this.phonevalid = new phoneNumber(value, 'US').isValid();
				return _this.phonevalid;
			 });
	   },
	   beforeCreate() {
		  subscriptionService.model(this).then(result => {
			 this.model = result.data;
			 this.$store.commit('loaded');
		  });
	   }
    };
</script>