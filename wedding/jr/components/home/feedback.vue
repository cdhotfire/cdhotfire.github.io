<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebFeedbackPageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebFeedbackPageBody">
        </quill-editor>
        <div class="text-center">
            <transition name="transition">
                <div v-if="sendFeedback">
                    <hr class="mb-3" />
                    <div class="row justify-content-sm-center">
                        <div class="form-group col-sm-6">
                            <label for="firstname" class="form-control-label" :class="{ 'text-danger': errors.has('firstname') }">
                                First Name
                                <sup>
                                    <small class="text-danger">(required)</small>
                                </sup>
                            </label>
                            <input class="form-control" :class="{ 'is-invalid': errors.has('firstname') }" id="firstname" name="firstname" type="text" placeholder="First Name" v-validate="'required'" v-model="formData.firstname" />
                            <small v-if="errors.has('firstname')" class="help-block text-danger">{{errors.first('firstname')}}</small>
                        </div>
                    </div>
                    <div class="row justify-content-sm-center">
                        <div class="form-group col-sm-6">
                            <label for="lastname" class="form-control-label" :class="{ 'text-danger': errors.has('lastname') }">
                                Last Name
                                <sup>
                                    <small class="text-danger">(required)</small>
                                </sup>
                            </label>
                            <input class="form-control" :class="{ 'is-invalid': errors.has('lastname') }" id="lastname" name="lastname" type="text" placeholder="Last Name" v-validate="'required'" v-model="formData.lastname">
                            <small v-if="errors.has('lastname')" class="help-block text-danger">{{errors.first('lastname')}}</small>
                        </div>
                    </div>
                    <div class="row justify-content-sm-center">
                        <div class="form-group col-sm-6">
                            <label for="email" class="form-control-label" :class="{ 'text-danger': errors.has('email') }">
                                Email Address
                                <sup>
                                    <small class="text-danger">(required)</small>
                                </sup>
                            </label>
                            <input class="form-control" :class="{ 'is-invalid': errors.has('email') }" id="email" name="email" type="text" placeholder="Email Address" v-validate="'required|email'" v-model="formData.email" />
                            <small v-if="errors.has('email')" class="help-block text-danger">{{errors.first('email')}}</small>
                        </div>
                    </div>
                    <div class="row justify-content-sm-center">
                        <div class="form-group col-sm-6">
                            <label for="message" class="form-control-label" :class="{ 'text-danger': errors.has('message') }">
                                Message
                                <sup>
                                    <small class="text-danger">(required)</small>
                                </sup>
                            </label>
                            <textarea class="form-control" :class="{ 'is-invalid': errors.has('message') }" id="message" name="message" placeholder="Message" v-validate="'required'" v-model="formData.message" />
                            <small v-if="errors.has('message')" class="help-block text-danger">{{errors.first('message')}}</small>
                        </div>
                    </div>
                </div>
            </transition>
            <b-button :variant="'primary'" @click="feedback" :disabled="errors.any() || processing">
                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                Send Feedback
            </b-button>
            <b-button :variant="'danger'" v-if="sendFeedback" @click="cancel">Cancel</b-button>
        </div>
    </div>
</template>
<script>
    import feedbackService from "services/feedback";

    export default {
	   data() {
		  return {
			 sendFeedback: false,
			 model: { Editable: true },
			 formData: {
			 },
			 processing: false,
			 errorList: {
				custom: {
				    firstname: {
					   required: "First Name is required."
				    },
				    lastname: {
					   required: "Last Name is required."
				    },
				    email: {
					   required: "Email Address is required.",
					   email: "Email Address is invalid.",
				    },
				    message: {
					   required: "A message is required."
				    }
				}
			 }
		  }
	   },
	   methods: {
		  feedback() {
			 if (this.sendFeedback && !this.processing) {
				this.$validator.validateAll().then(result => {
				    if (result) {
					   this.processing = true;
					   feedbackService
						  .submitFeedback(this, this.formData)
						  .then(data => {
							 if (data.data.indexOf("Success") >= 0) this.clearForm();
							 swal(
								"Feedback",
								data.data,
								data.data.indexOf("Error") >= 0 ? "error" : "success"
							 );
						  }).finally(() => this.processing = false);
				    }
				});
			 }
			 else
				this.sendFeedback = true;
		  },
		  clearForm() {
			 this.formData = {};
		  },
		  cancel() {
			 this.sendFeedback = false;
			 this.clearForm();
		  }
	   },
	   mounted() {
		  this.$validator.localize("en", this.errorList);
	   },
	   beforeCreate() {
		  feedbackService.model(this).then(result => {
			 this.model = result.data;
			 this.$store.commit('loaded');
		  });
	   }
    };
</script>