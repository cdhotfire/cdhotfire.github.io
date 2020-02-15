<template>
  <div>
    <div v-if="!loaded">
      <loading></loading>
    </div>
    <div v-show="loaded" class="wow fadeIn">
      <headertop></headertop>
      <navigation></navigation>
      <div class="balloon-trigger"></div>
      <div class="balloon-target">
        <div class="page-section" id="home">
          <bridegroom></bridegroom>
        </div>
        <divider class="alternate" icon="images"></divider>
        <div class="page-section alternate" id="gallerysection">
          <gallery class="wow fadeIn"></gallery>
        </div>
        <div id="theend">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bridegroom from "./sections/bridegroom";
import gallery from "./sections/gallery";
import whenwhere from "./sections/whenwhere";
import header from "./sections/header";
import navigation from "./sections/navigation";
import loading from "./sections/loading";
import accommodations from "./sections/accommodations";
import divider from "./sections/divider";

import WOW from "wowjs/dist/wow.js";

export default {
  components: {
    bridegroom,
    gallery,   
    headertop: header,
    navigation,
    loading,
    divider
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.loaded = true;
    Pace.stop();
    new WOW.WOW().init();
  }
};
</script>

