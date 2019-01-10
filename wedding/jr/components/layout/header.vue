<template>
    <div>
        <div class="themeSelector container" v-if="$store.getters.editaccess">
            <div class="row">
                <div class="col-sm-3 swatch-text">
                    Primary Color
                </div>
                <div class="col-sm-3 text-left">
                    <swatches class="swatch" :colors="colors" row-length="6" show-fallback v-model="model.PrimaryColor" @input="changeColors()">
                    </swatches>
                </div>
                <div class="col-sm-3 swatch-text">
                    Secondary Color
                </div>
                <div class="col-sm-3 text-left">
                    <swatches class="swatch" :colors="colors" row-length="6" show-fallback v-model="model.SecondaryColor" @input="changeColors()">
                    </swatches>
                </div>
            </div>
        </div>
        <div class="header container">
            <quill-editor v-bind:editable="model.Editable" v-model="model.WebHeader" settingkey="WebHeader">
            </quill-editor>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div class="navbar-container container text-center">
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="true" aria-label="Toggle navigation">
                    Menu
                    <font-awesome-icon icon="bars"></font-awesome-icon>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item" v-for="(tab, index) in $store.state.tabs" v-if="tabs[index] && tab.Text && hasaccess(index)" :key="index">
                            <router-link class="nav-link" :to="tabs[index].path" active-class="active" :class="{ 'active': subIsActive(tabs[index].path) }" exact>
                                <font-awesome-icon :icon="tabs[index].icon" size="lg"></font-awesome-icon>
                                <div v-html="tab.Text"></div>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav mb-auto" v-if="$store.state.showlogin">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login" active-class="active" exact>
                                <div v-if="!$store.getters.authenticated">
                                    <font-awesome-icon icon="user" size="lg"></font-awesome-icon>
                                    <div v-html="$store.state.tabs.Login.Text"></div>
                                </div>
                                <div v-else>
                                    <avatar :username="$store.state.token.username" class="avatar" :size="25"></avatar>
                                    <div>
                                        {{$store.state.token.username}}
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import colors from "assets/colors.json";
import swatches from "vue-swatches";
import Avatar from "vue-avatar";
import homeService from "services/home";

export default {
  props: ["model"],
  data() {
    return {
      colors: colors,
      tabs: {
        Home: {
          icon: "home",
          path: "/home"
        },
        Reporting: {
          icon: "newspaper",
          path: "/reporting"
        },
        Excusal: {
          icon: "sign-out-alt",
          path: "/excusal"
        },
        Calendar: {
          icon: "calendar-alt",
          path: "/calendar"
        },
        Attendance: {
          icon: "address-book",
          path: "/attendance"
        },
        Subscription: {
          icon: "exclamation-triangle",
          path: "/subscription"
        },
        Questionnaire: {
          icon: "question-circle",
          path: "/questionnaire"
        }
      }
    };
  },
  components: { swatches, Avatar },
  methods: {
    hasaccess(tab) {
      if (tab == "Calendar") return this.$store.getters.calendaraccess;

      return true;
    },
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0;
      });
    },
    changeColors(initial) {
      if (!this.model.PrimaryColor || !this.model.SecondaryColor) return;

      less.modifyVars({
        "@dark-color": this.model.PrimaryColor,
        "@success-color": this.model.SecondaryColor
      });

      if (!initial) {
        homeService.saveSetting(this, {
          SettingKey: "WebPrimaryColor",
          SettingValue: this.model.PrimaryColor
        });
        homeService.saveSetting(this, { 
          SettingKey: "WebSecondaryColor",
          SettingValue: this.model.SecondaryColor
        });
      }
    }
  }
};
</script>
<style>
.vue-avatar--wrapper {
  margin-left: auto;
  margin-right: auto;
}
</style>