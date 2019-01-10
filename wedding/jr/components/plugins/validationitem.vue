<template>
    <div class="form-group">
        <label class="form-control-label" :class="{ 'text-danger': errors.has(name) }">
            {{display}}
            <sup v-if="required">
                <small class="text-danger">(required)</small>
            </sup>
            <input v-if="!mask && showinput" class="form-control" :class="{ 'is-invalid': errors.has(name) }" :name="name" :type="type" :placeholder="display" v-model="val" @blur="updatevalidation" />
            <input v-else-if="showinput" v-mask="mask" class="form-control" :class="{ 'is-invalid': errors.has(name) }" :name="name" :type="type" :placeholder="display" v-model="val" @blur="updatevalidation" />
        </label>
        <v-select v-if="showselect" :placeholder="display" v-model="val" :options="options" :name="name"></v-select>
        <flat-pickr v-else-if="showdate" :config="dateconfig" class="form-control form-control-event" :name="name" v-model="val" :placeholder="display"></flat-pickr>
        <small v-if="errors.has(name)" class="help-block text-danger">{{errors.first(name)}}</small>
    </div>
</template>
<script>
    import vSelect from 'vue-select';
    import flatPickr from 'vue-flatpickr-component';

    export default {
	   inject: ['$validator'],
	   data() {
		  return {
			 val: null,
			 created: false,
			 validation: {},
			 dateconfig: {
				altInput: true,
				altFormat: "F j, Y",
				dateFormat: "Y-m-d",
			 }
		  }
	   },
	   props: {
		  value: {},
		  display: String,
		  valid: [Object, String],
		  name: String,
		  confirm: String,
		  type: { type: String, default: 'text' },
		  mask: String,
		  options: Array,
		  filter: {}
	   },
	   components: { vSelect, flatPickr },
	   computed: {
		  required() {
			 return this.valid ? (this.valid.indexOf('required') >= 0 || this.valid.required) : false;
		  },
		  showselect() {
			 return this.type === 'select';
		  },
		  showdate() {
			 return this.type === 'date';
		  },
		  showinput() {
			 return !this.showselect && !this.showdate;
		  }
	   },
	   watch: {
		  value(val) {
			 if (this.filter)
				val = this.filter(val);

			 this.val = val;
		  },
		  confirm(val) {
			 this.validation.rules.is = [val];
			 this.updatevalidation();
		  },
		  val(value) {
			 if (!this.created)
				return;

			 if (this.filter)
				value = this.filter(value);

			 this.$emit('update:value', value);
			 this.updatevalidation();
		  }
	   },
	   methods: {
		  updatevalidation() {
			 if (!this.created)
				return;

			 this.$validator.validate(this.name);
		  }
	   },
	   created() {
		  this.$nextTick(() => this.created = true);
		  this.val = this.value;

		  this.validation =
			 this.$validator.attach({
				name: this.name,
				rules: this.valid,
				getter: () => {
				    return this.val;
				}
			 });
	   },
	   destroyed() {
		  this.$validator.detach(this.name);
	   }
    }
</script>