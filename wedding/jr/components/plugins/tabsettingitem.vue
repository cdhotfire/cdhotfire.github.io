<template>
    <div class="row justify-content-sm-center mb-2">
        <div class="col-sm-3 tabsettinglabel">
            <div v-if="haschild">
                <b-button variant="success" @click="showchildevent">
                    <font-awesome-icon :icon="childicon" fixed-width></font-awesome-icon>
                    {{setting}}
                </b-button>
            </div>
            <div v-else>
                <label :for="setting">
                    {{setting}}
                </label>
            </div>
        </div>
        <div class="col-sm-3">
            <input class="form-control" type="text" :placeholder="setting" v-model="value" :id="setting" />
        </div>
        <div class="col-sm-1">
            <input type="number" class="form-control" v-model="order" v-if="setting != 'WebLoginButtonText'" />
        </div>
        <div class="col-sm-1">
            <b-button :disabled="processing" :variant="'primary'" @click="save">
                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                Save
            </b-button>
        </div>
    </div>
</template>
<style scoped>
    .tabsettinglabel {
    margin-top: auto;
    margin-bottom: auto;
    }
</style>
<script>
    import homeService from "services/home";

    export default {
	   data() {
		  return {
			 value: "",
			 order: 0,
			 processing: false,
			 showchild: false
		  }
	   },
	   computed: {
		  childicon() {
			 return this.showchild ? 'angle-down' : 'angle-right';
		  }
	   },
	   props: {
		  tab: String,
		  setting: String,
		  val: String,
		  ord: Number,
		  parent: String,
		  haschild: Boolean
	   },
	   methods: {
		  showchildevent() {
			 this.showchild = !this.showchild;
			 this.$emit('child', this.showchild);
		  },
		  save() {
			 if (this.processing)
				return;

			 var _this = this;
			 this.processing = true;
			 homeService
				.saveSetting(this, {
				    SettingKey: this.setting,
				    SettingValue: this.value,
				    SettingOrder: this.order
				})
				.then(function () {
				    _this.$store.commit('updatetab', { tab: _this.tab, value: _this.value, order: _this.order, parent: _this.parent });
				    swal("Tab", "Saved " + _this.tab + " tab successfully.", "success");
				})
				.finally(() => this.processing = false);
		  }
	   },
	   created() {
		  this.value = this.val;
		  this.order = this.ord;
	   }
    }
</script>