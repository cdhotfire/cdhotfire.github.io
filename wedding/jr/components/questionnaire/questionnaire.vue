<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebQuestionnairePageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebQuestionnairePageBody">
        </quill-editor>
        <div class="text-center mt-4 mb-4" v-if="$store.getters.editaccess">
            <b-button variant="primary" @click="showsubmittedquestionnaires" size="lg">View Submitted Questionnaire</b-button>
        </div>
        <validation-section :fm.sync="formData" :emailRequired="model.WebRequireEmailAddress"></validation-section>
        <div class="text-center" v-if="allowload">
            <button :disabled="errors.any() || processing" class="btn btn-success btn-lg" type="button" v-on:click="loadQuestionnaire">
                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                Load Questionnaire
            </button>
        </div>
        <div v-if="model.Item && model.Item.Questions.length > 0" class="pt-3">
            <hr />
            <quill-editor v-bind:editable="model.Editable" v-model="model.WebQuestionnaireQuestionsHeading" settingkey="WebQuestionnaireQuestionsHeading">
            </quill-editor>
            <hr />
            <quill-editor v-bind:editable="model.Editable" v-model="model.WebQuestionnaireQuestionsBody" settingkey="WebQuestionnaireQuestionsBody">
            </quill-editor>
            <div v-for="(q, i) in model.Item.Questions" :key="i">
                <div class="row">
                    <div class="col-sm-8 questionCol">
                        <label :for="q.Question" :class="{ 'text-danger': q.Required && errors.has(q.Question) }">
                            {{q.Question}}
                            <sup v-if="q.Required">
                                <small class="text-danger">(required)</small>
                            </sup>
                        </label>
                    </div>
                    <div class="col-sm-4">
                        <div v-if="q.Required">
                            <input v-if="q.DataType=='Integer'" min="0" type="number" v-model="q.Response" class="form-control" :name="q.Question" v-validate="'required'" :class="{ 'is-invalid': q.Required && errors.has(q.Question) }" v-on:change="q.Response = (Math.abs(q.Response) === NaN ? 0 : Math.abs(q.Response))" />
                            <b-form-checkbox v-else-if="q.DataType=='Boolean'" type="checkbox" v-model="q.Response" :name="q.Question" v-validate="'required'" :class="{ 'is-invalid': q.Required && errors.has(q.Question) }" />
                            <select v-else-if="q.DataType=='Combo'" v-model="q.Response" class="form-control" :name="q.Question" v-validate="'required'" :class="{ 'is-invalid': q.Required && errors.has(q.Question) }">
                                <option v-for="(c,ci) in q.Combo" :value="c" :key="ci">{{c}}</option>
                            </select>
                            <input v-else type="text" v-model="q.Response" class="form-control" v-validate="'required'" :name="q.Question" :class="{ 'is-invalid': q.Required && errors.has(q.Question) }" />
                        </div>
                        <div v-else>
                            <input v-if="q.DataType=='Integer'" min="0" type="number" v-model="q.Response" class="form-control" v-on:change="q.Response = (Math.abs(q.Response) === NaN ? 0 : Math.abs(q.Response))" />
                            <b-form-checkbox v-else-if="q.DataType=='Boolean'" type="checkbox" v-model="q.Response" />
                            <select v-else-if="q.DataType=='Combo'" v-model="q.Response" class="form-control">
                                <option v-for="(c,ci) in q.Combo" :value="c" :key="ci">{{c}}</option>
                            </select>
                            <input v-else type="text" v-model="q.Response" class="form-control" />
                        </div>
                    </div>
                </div>
                <div v-if="q.Required && errors.has(q.Question)" class="text-center">
                    <small class="help-block text-danger">{{errors.first(q.Question)}}</small>
                </div>
                <hr class="lightHr" />
            </div>
            <div class="text-center mt-4">
                <button :disabled="errors.any() || processing" class="btn btn-primary btn-lg" type="button" v-on:click="validateForm">
				<font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import questionnaireService from "services/questionnaire";

    export default {
	   data() {
		  return {
			 originalModel: {},
			 model: {},
			 allowload: false,
			 formData: {
				poolid: 0,
				jurornumber: 0,
				dlnumber: ""
			 },
			 processing: false,
		  };
	   },
	   methods: {
		  validateForm() {
			 this.$validator.validateAll().then(result => {
				if (result && !this.processing) {
				    this.processing = true;
				    this.formData.Questions = [];

				    for (var i in this.model.Item.Questions) {
					   let q = {};
					   q.Id = this.model.Item.Questions[i].Id;
					   q.Response = this.model.Item.Questions[i].Response;
					   this.formData.Questions.push(q);
				    }

				    questionnaireService
					   .submitQuestionnaire(this, this.formData)
					   .then(data => {
						  if (data.data.indexOf("Success") >= 0) this.clearForm();
						  swal(
							 "Questionnaire",
							 data.data,
							 data.data.indexOf("Error") >= 0 ? "error" : "success"
						  );
					   })
					   .finally(() => this.processing = false);
				}
			 });
		  },
		  clearForm() {
			 this.model = Object.assign({}, this.originalModel);
			 if (!this.allowload)
				for (var i in this.model.Item.Questions)
				    this.model.Item.Questions[i].Response = '';
			 else
				this.model.Item = null;

			 if (this.formData.reset)
				this.formData.reset();

			 this.formData = {
				poolid: 0,
				jurornumber: 0,
				dlnumber: ""
			 };
		  },
		  showsubmittedquestionnaires() {
			 this.$router.push('questionnaireresponses');
		  },
		  loadQuestionnaire() {
			 this.$validator.validateAll().then(result => {
				if (result && !this.processing) {
				    this.processing = true;

				    questionnaireService
					   .loadQuestionnaire(this, this.formData)
					   .then(data => {
						  if (data.data.message && data.data.message.indexOf("Error") >= 0)
							 swal(
								"Questionnaire",
								data.data.message,
								"error"
							 );
						  else {
							 this.originalModel.Item = this.model.Item = data.data.Item;
						  }
					   })
					   .finally(() => this.processing = false);
				}
			 });

		  }
	   },
	   mounted() {
		  this.$validator.localize("en", this.$store.state.validationErrors);
	   },
	   beforeCreate() {
		  questionnaireService.model(this).then(result => {
			 this.allowload = !result.data.Item;
			 this.originalModel = result.data;
			 this.clearForm();
			 this.$store.commit('loaded');
		  });
	   }
    };
</script>
<style scoped>
    .questionCol {
    font-size: 1.3em;
    }
</style>