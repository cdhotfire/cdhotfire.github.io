<template>
    <div class="text-center">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
	   created() {
		  this.$store.commit('loaded');
	   }
    }
</script>