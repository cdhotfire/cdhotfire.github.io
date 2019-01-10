<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebAttendancePageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebAttendancePageBody">
        </quill-editor>
        <validation-section :fm.sync="formData" :emailRequired="model.WebRequireEmailAddress"></validation-section>
        <div class="text-center">
            <button :disabled="errors.any() || processing" class="btn btn-primary btn-lg" type="button" v-on:click="validateForm">
                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                Get Letter
            </button>
        </div>
    </div>
</template>
<script>
    import attendanceService from "services/attendance";

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

				    attendanceService.getAttendanceStatus(this, this.formData).then(data => {
					   if (data.data.indexOf("Error") >= 0)
						  swal("Attendance Status", data.data, "error");
					   else {
						  if (this.formData.reset)
							 this.formData.reset();

						  if (data.data.indexOf("?") == 0) {
							 window.location = "api/attendance/downloadAttendance/" + data.data;
							 swal("Attendance Status", "Downloading Attendance Form", "success");
						  }
						  else
							 swal("Attendance Status", data.data, "warning");
					   }
				    }).finally(() => this.processing = false);
				}
			 });
		  }
	   },
	   mounted() {
		  this.$validator.localize("en", this.$store.state.validationErrors);
	   },
	   beforeCreate() {
		  attendanceService.model(this).then(result => {
			 this.model = result.data;
			 this.$store.commit('loaded');
		  });
	   }
    };
</script>