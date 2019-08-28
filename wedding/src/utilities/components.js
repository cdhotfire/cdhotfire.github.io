import Vue from "vue";

import "bootstrap";
import jquery from "jquery";

window.jQuery = jquery;
window.$ = jquery;

// libraries
import "regenerator-runtime/runtime";

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

import VueConfetti from "vue-confetti";
Vue.use(VueConfetti);

var VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo);

import VueProgress from "vue-progress-path";

Vue.use(VueProgress, {
  // defaultShape: 'circle',
});
