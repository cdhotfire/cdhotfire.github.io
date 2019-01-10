<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebExcusalPageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebExcusalPageBody">
        </quill-editor>
        <validation-section :fm.sync="formData" :emailRequired="model.WebRequireEmailAddress"></validation-section>
        <div class="text-center">
            <button :disabled="errors.any() || processing" class="btn btn-primary btn-lg" type="button" v-on:click="validateForm">
                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                Get Status
            </button>
        </div>
    </div>
</template>
<script>
    import excusalService from "services/excusal";

    export default {
	   data() {
		  return {
			 model: {},
			 processing: false,
			 formData: {
				poolid: 0,
				jurornumber: 0,
				firstname: "",
				lastname: "",
				email: "",
				confirmemail: "",
				dlnumber: ""
			 }
		  };
	   },
	   methods: {
		  validateForm() {
			 this.$validator.validateAll().then(result => {
				if (result && !this.processing) {
				    this.processing = true;

				    excusalService.getExcusalStatus(this, this.formData).then(data => {
					   let symbol = 'warning';

					   const d = data.data.toUpperCase();
					   if (d.indexOf('ERROR') >= 0 || d.indexOf('DENIED') >= 0)
						  symbol = 'error';
					   else if (d.indexOf('EXCUSED') >= 0)
						  symbol = 'success';

					   swal(
						  "Excusal Status",
						  data.data,
						  symbol
					   );

					   if (symbol == 'error' && this.formData.reset)
						  this.formData.reset();
				    }).finally(() => this.processing = false);
				}
			 });
		  }
	   },
	   mounted() {
		  this.$validator.localize("en", this.$store.state.validationErrors);
	   },
	   beforeCreate() {
		  excusalService.model(this).then(result => {
			 this.model = result.data;
			 this.$store.commit('loaded');
		  });
	   }
    };
</script>