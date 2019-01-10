<template>
  <div>
    <div v-if="loaded">
      <app-header :model="model"></app-header>
      <div class="body-content container pb-1 rounded">
        <div class="button-menu-right">
          <button class="btn btn-primary" v-on:click="printView">
            <font-awesome-icon icon="print" fixed-width size="lg"></font-awesome-icon>
            Print Screen
          </button>
        </div>
        <div class="clear"></div>
        <div id="bodycontent">
          <div v-show="!$store.state.loading">
            <transition name="transition" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
          <div v-if="$store.state.loading" class="text-center">
            <div class="loader"></div>
            <div class="loader-text">Loading...</div>
          </div>
        </div>
        <app-footer class="mt-3" :model="model"></app-footer>
      </div>
    </div>
    <div v-else class="notloaded">
      Loading...
    </div>
  </div>
</template>
<script>
import appHeader from "components/layout/header.vue";
import appFooter from "components/layout/footer.vue";
import print from "print-html-element";
import quillEditor from "components/plugins/quill.vue";
import starline from "components/layout/starline.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import validationSection from "components/plugins/validationsection.vue";

import globalService from "services/global";
import loginService from "services/login";

let routertab = "";
let routertitle = "";
export default {
  data() {
    return {
      loaded: false,
      model: {}
    };
  },
  components: {
    appHeader,
    appFooter
  },
  watch: {
    $route(value) {
      this.$store.commit("loading");
    }
  },
  methods: {
    handleError: (_this, error) => {
      swal({
        title: "Oops....",
        html:
          "An error has occurred while processing the request, the error has been logged.",
        type: "error"
      });

      globalService.saveerror(_this, error);
      throw error;
    },
    printView() {
      this.$nextTick(() => {
        print.printElement(document.getElementById("bodycontent"));
      });
    },
    initialize(Vue, router, store, axios) {
      const _this = this;

      this.setupRouter(router, store, axios);

      store.dispatch("setlogin");

      axios.interceptors.request.use(config => {
        // don't cache for IE 11
        config.headers.Pragma = "no-cache";
        return config;
      });

      axios.interceptors.response.use(
        response => {
          if (response.status !== 200 && response.status !== 204)
            _this.handleError(axios, response);

          return response;
        },
        error => {
          if (
            error.response.request &&
            error.response.request.responseURL &&
            error.response.request.responseURL.indexOf("saveerror") >= 0
          )
            return Promise.reject(error);

          if (
            error.response.status === 403 ||
            (error.response.status == 400 &&
              error.response.data.error === "invalid_grant")
          )
            store.dispatch("expiredsession", router);
          else if (error.response.status === 401)
            router.push({ path: "/error/401" });
          else _this.handleError(axios, error);

          return Promise.reject(error);
        }
      );

      // global components
      Vue.component("quill-editor", quillEditor);
      Vue.component("starline", starline);
      Vue.component("font-awesome-icon", FontAwesomeIcon);
      Vue.component("validation-section", validationSection);
    },
    setupRouter(router, store, axios) {
      router.beforeEach((to, from, next) => {
        var t;

        if (store.state.tabs.length > 0)
          if (to.meta.parent) t = store.state.tabs[to.meta.parent][to.meta.tab];
          else t = store.state.tabs[to.meta.tab];

        const title = store.state.tabs.length > 0 ? t.Text : null;
        routertab = to.meta.tab;
        routertitle = to.meta.title;
        document.title = "Jury Web - " + (title ? title : to.meta.title);

        if (store.getters.authenticated)
          loginService.checkLogin(store, axios, router);

        next();
      });
    },
    setPageTitle() {
      const title = this.$store.state.tabs[routertab]
        ? this.$store.state.tabs[routertab].Text
        : null;
      document.title = "Jury Web - " + (title ? title : routertitle);
    },
    setModel(extra) {
      globalService.model(this).then(result => {
        this.model = result.data;
        this.$store.commit("settabs", JSON.parse(this.model.Tabs));
        this.$store.commit("setrecaptcha", {
          sitekey: this.model.ReCaptchaSiteKey,
          required: this.model.ReCaptchaRequired
        });
        this.$store.commit("setshowlogin", this.model.ShowLogin);

        if (extra) extra();
      });
    }
  },
  errorCaptured(error) {
    this.handleError(this.$http, error);
  },
  created() {
    const _this = this;

    this.setModel(() => {
      this.$store.commit("setversion", this.model.Version);
      this.$store.commit("setvalidationmethod", this.model.ValidationMethod);

      $("head").append(
        '<link rel="stylesheet/less" href="dist/default.less?v=' +
          this.$store.state.version +
          '" id="themeless">'
      );
      less.sheets.push(document.getElementById("themeless"));

      if (this.model.PrimaryColor && this.model.SecondaryColor)
        less
          .refresh(true, {
            "@dark-color": this.model.PrimaryColor,
            "@success-color": this.model.SecondaryColor
          })
          .then(() => {
            this.loaded = true;
          });
      else this.loaded = true;

      this.setPageTitle();
    });
  }
};
</script>
<style scoped>
.loader-text {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 10px;
}

.notloaded {
  height: 100%;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  font-size: 2em;
  font-weight: bold;
  margin-top: 2em;
}

div.button-menu-right {
  padding-top: 5px;
  float: right;
}
</style>