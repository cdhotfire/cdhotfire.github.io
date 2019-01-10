<template>
    <div>
        <quill-editor :editable="model.Editable" v-model="model.Heading" settingkey="WebHomePageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor :editable="model.Editable" v-model="model.Body" settingkey="WebHomePageBody">
        </quill-editor>
    </div>
</template>
<script>
    import homeService from "services/home";

    export default {
	   data() {
		  return {
			 model: {}
		  };
	   },
	   beforeCreate() {
		  homeService.model(this).then(result => {
			 this.model = result.data;
			 this.$store.commit('loaded');
		  });
	   }
    };
</script>
