<template>
    <div class="footer container mt-4">
        <div class="col-lg-12 text-center">
            <starline></starline>
            <quill-editor :editable="model.Editable" v-model="model.WebFooter" settingkey="WebFooter">
            </quill-editor>
            <div class="webfooter" :class="{ 'mt-4': !model.WebFooter }">
                {{model.Year}} Pioneer Technology Group All Rights Reserved. Website Version {{model.Version}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
	   props: ["model"]
    };
</script>
<style scoped>
    .webfooter {
    font-size: 0.75em;
    font-weight: bold;
    }
</style>