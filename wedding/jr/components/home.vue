<template>
	<div>
		<div class="button-menu-left noprint">
			<b-form-radio-group buttons button-variant="primary" v-model="routepath" @change="changeRoute" size="sm">
				<b-form-radio v-for="(tab, index) in this.$store.state.tabs['Home'].Children" v-if="tab.Text" :key="index" :value="tabs[index].path">
					<font-awesome-icon :icon="tabs[index].icon" size="lg"></font-awesome-icon>
					<div v-html="tab.Text"></div>
				</b-form-radio>
			</b-form-radio-group>
		</div>
		<div class="clear"></div>
		<div>
			<div v-show="!$store.state.loading">
				<transition name="transition" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      routepath: "/home",
      tabs: {
        HomeHome: {
          icon: "home",
          path: "/home"
        },
        Directions: {
          icon: "map",
          path: "/home/directions"
        },
        FAQ: {
          icon: "question-circle",
          path: "/home/faq"
        },
        Feedback: {
          icon: "envelope",
          path: "/home/feedback"
        }
      }
    };
  },
  watch: {
    $route(value) {
      this.routepath = value.path;
    }
  },
  methods: {
    changeRoute(value) {
      this.$router.push({ path: value });
    }
  },
  created() {
    this.routepath = this.$route.path;
  }
};
</script>
<style scoped>
@media (max-width: 575px) {
  div.button-menu-left {
    padding-top: 5px;
    margin-top: 0px !important;
  }
}

div.button-menu-left {
  margin-top: -38px;
  float: left;
}
</style>