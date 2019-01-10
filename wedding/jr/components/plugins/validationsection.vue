<template>
	<div>
		<div class="row" key="emailRequired" v-if="emailRequired || showEmail">
			<div class="col-sm-6">
				<validation-item :value.sync="formData.email" :confirm.sync="formData.confirmemail" display="Email Address" :valid="emailRequired ? 'required|email' : 'email'" name="email"></validation-item>
			</div>
			<div class="col-sm-6">
				<validation-item :value.sync="formData.confirmemail" display="Confirm Email Address" :valid="emailRequired ? 'required|email' : 'email'" name="confirmemail"></validation-item>
			</div>
		</div>
		<div class="row justify-content-md-center">
			<div class="col-sm-7 col-md-6 col-lg-4" v-if="showdlnumber">
				<validation-item :value.sync="formData.dlnumber" type="dlnumber" display="Driver's License Number" :valid="'required'" name="dlnumber" :filter="dlfilter.bind(this)"></validation-item>
			</div>
			<div class="col-sm-6 col-md-6 col-lg-3" v-if="!showdlnumber">
				<validation-item :value.sync="formData.poolid" type="number" display="Pool Id" :valid="'required|numeric|min_value:1'" name="poolid"></validation-item>
			</div>
			<div class="col-sm-6 col-md-6 col-lg-3" v-if="!showdlnumber">
				<validation-item :value.sync="formData.jurornumber" type="number" display="Juror Number" :valid="'required|numeric|min_value:1'" name="jurornumber"></validation-item>
			</div>
			<div class="col-sm-6 col-md-6 col-lg-3">
				<validation-item :value.sync="formData.firstname" display="First Name" :valid="'required'" name="firstname" :required="true"></validation-item>
			</div>
			<div class="col-sm-6 col-md-6 col-lg-3">
				<validation-item :value.sync="formData.lastname" display="Last Name" :valid="'required'" name="lastname" :required="true"></validation-item>
			</div>
		</div>
		<div class="row justify-content-md-center" v-if="$store.state.recaptcha.required">
			<div class="text-center">
				<vue-recaptcha ref="recaptcha" :class="{ recaptchaerror: errors.has('recaptcha') }" @verify="recaptchaverified" @expired="recaptchaexpired" class="ml-2" :sitekey="$store.state.recaptcha.sitekey"></vue-recaptcha>
				<b-button variant="primary" v-if="formData.recaptcha" @click="reset">Reset</b-button>
				<small v-if="errors.has('recaptcha')" class="help-block text-danger">{{errors.first('recaptcha')}}</small>
			</div>
		</div>
	</div>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";
import validationItem from "components/plugins/validationitem.vue";

export default {
  inject: ["$validator"],
  data() {
    return {
      formData: {
        poolid: 0,
        jurornumber: 0,
        firstname: "",
        lastname: "",
        email: "",
        dlnumber: "",
        confirmemail: "",
        phonenumber: "",
        notifylevel: 0,
        recaptcha: ""
      },
      dlfilter(val) {
        if (!val) return val;
        return val.replace(/[^a-zA-Z\d\s:]/g, "");
      }
    };
  },
  computed: {
    showdlnumber() {
      return this.$store.state.validationmethod == 1;
    }
  },
  components: { validationItem, VueRecaptcha },
  props: {
    fm: Object,
    emailRequired: Boolean,
    showEmail: Boolean
  },
  watch: {
    fm(n, o) {
      this.formData = n;
      if (this.formData) this.formData.reset = this.reset;
    }
  },
  methods: {
    recaptchaverified(response) {
      this.formData.recaptcha = response;
      this.$validator.validate("recaptcha");
    },
    recaptchaexpired() {
      this.formData.recaptcha = "";
      this.$validator.validate("recaptcha");
    },
    reset() {
      if (this.$store.state.recaptcha.required) {
        this.recaptchaexpired();
        this.$refs.recaptcha.reset();
      }
    }
  },
  created() {
    this.formData = this.fm;

    if (this.$store.state.recaptcha.required) {
      // add recaptcha
      if (!document.getElementById("googleRecaptcha")) {
        const script = document.createElement("script");
        script.id = "googleRecaptcha";
        script.src =
          "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit";
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
      }

      this.$validator.attach({
        name: "recaptcha",
        rules: "required",
        getter: () => this.formData.recaptcha
      });
    }
  },
  destroyed() {
    if (this.$store.state.recaptcha.required)
      this.$validator.detach("recaptcha");
  }
};
</script>