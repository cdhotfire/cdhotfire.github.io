<template>
    <div class="row justify-content-sm-center mb-2">
        <div class="col-sm-3">
            {{lookup}}
        </div>
        <div class="col-sm-7">
            <input class="form-control" type="text" :placeholder="lookup" v-model="value" />
        </div>
        <div class="col-sm-1">
            <b-button :disabled="processing" :variant="'primary'" @click="save">
                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                Save
            </b-button>
        </div>
    </div>
</template>
<script>
    import homeService from "services/home";

    export default {
	   data() {
		  return {
			 value: "",
			 processing: false
		  }
	   },
	   props: {
		  lookup: String,
		  listname: String,
		  val: String
	   },
	   watch: {
		  val(n, o) {
			 this.value = n;
		  }
	   },
	   methods: {
		  save() {
			 if (this.processing)
				return;

			 var _this = this;
			 this.processing = true;
			 homeService
				.saveLookup(this, {
				    ListName: this.listname,
				    ListValue: this.lookup,
				    Description: this.value
				})
				.then(function () {
				    swal("Lookup", "Saved " + _this.listname + " " + _this.lookup + " successfully.", "success");
				})
				.finally(() => this.processing = false);
		  }
	   },
	   created() {
		  this.value = this.val;
	   }
    }
</script>