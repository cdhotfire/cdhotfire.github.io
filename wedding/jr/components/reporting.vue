<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebReportingPageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebReportingPageBody">
        </quill-editor>
        <div v-if="!model.ShowReportingGroups">
            <validation-section :fm.sync="formData" :emailRequired="model.WebRequireEmailAddress"></validation-section>
            <div class="text-center">
                <button :disabled="errors.any() || processing" class="btn btn-primary btn-lg" type="button" v-on:click="validateForm">
                    <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                    Get Status
                </button>
            </div>
        </div>
        <div class="table-responsive" v-else>
            <table class="table table-bordered">
                <thead class="thead-inverse">
                    <tr>
                        <th>Pool ID</th>
                        <th>Appearance Date</th>
                        <th class="text-center">Juror Numbers</th>
                        <th>Service Note</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!model.ReportingGroups || model.ReportingGroups.length==0">
                        <td colspan="5 " class="text-center ">
                            No information available
                        </td>
                    </tr>
                    <tr v-for="(item, index) in model.ReportingGroups" :key="index" :class="requiredBackground(item.Type)">
                        <td class="align-middle ">{{item.PoolId}}</td>
                        <td class="align-middle ">{{item.AppearanceDate | moment("MMMM Do YYYY, h:mm A ")}}</td>
                        <td class="text-center align-middle">
                            <div v-for="numbers in item.Numbers" :key="numbers.StartNumber">
                                {{numbers.StartNumber}}
                                <span v-if="numbers.EndNumber> 0">
                                    <font-awesome-icon icon="arrows-alt-h"></font-awesome-icon>
                                    {{numbers.EndNumber}}
                                </span>
                            </div>
                        </td>
                        <td class="align-middle" :class="requiredColor(item.Type)">
                            <font-awesome-icon :icon="requiredIcon(item.Type)"></font-awesome-icon>
                            {{item.RequiredNote}}
                        </td>
                        <td class="align-middle">
                            <div v-if="item.Address1">
                                <span>{{item.Address1}},</span>
                                <span v-if="item.Address2">{{item.Address2}},</span>
                                <span v-if="item.City">{{item.City}}, {{item.State}} </span>
                                <span v-if="item.Zip"> {{item.Zip}}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import reportingService from "services/reporting";

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
	   mounted() {
		  this.$validator.localize("en", this.$store.state.validationErrors);
	   },
	   methods: {
		  validateForm() {
			 this.$validator.validateAll().then(result => {
				if (result && !this.processing) {
				    this.processing = true;

				    reportingService.getReportingStatus(this, this.formData).then(data => {
					   let symbol = 'success';

					   const d = data.data.toUpperCase();
					   if (d.indexOf('ERROR') >= 0)
						  symbol = 'error';
					   else if (d.indexOf('EXCUSED') >= 0 || d.indexOf('CHECK') || d.indexOf('CANCELLED'))
						  symbol = 'info';

					   swal("Reporting Status", data.data, symbol);
				    }).finally(() => this.processing = false);
				}
			 });
		  },
		  requiredIcon(type) {
			 if (type == 0) return "check";
			 else if (type == 1) return "clock";
			 else if (type == 2) return "times";

			 return "";
		  },
		  requiredColor(type) {
			 if (type == 0) return "text-success";
			 else if (type == 1) return "text-info";
			 else if (type == 2) return "text-danger";

			 return "";
		  },
		  requiredBackground(type) {
			 if (type == 0) return "bg-success";
			 else if (type == 1) return "bg-info";
			 else if (type == 2) return "bg-danger";

			 return "";
		  }
	   },
	   beforeCreate() {
		  reportingService.model(this).then(result => {
			 this.model = result.data;
			 this.$store.commit('loaded');
		  });
	   }
    };
</script>
<style scoped>
    .table {
    font-weight: bold;
    }

    .table > tbody > tr {
    font-size: 0.93em;
    }

    .bg-success {
    background-color: #a5d6a7 !important;
    }

    .bg-danger {
    background-color: #ef9a9a !important;
    }

    .bg-info {
    background-color: #90caf9 !important;
    }

    .text-info {
    color: #1976d2 !important;
    }

    .text-danger {
    color: #d32f2f !important;
    }

    .text-success {
    color: #388e3c !important;
    }
</style>