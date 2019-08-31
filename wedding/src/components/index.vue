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
          <countdown class="mt-5 wow fadeIn"></countdown>
        </div>
        <divider class="alternate" icon="map-marked-alt"></divider>
        <div class="page-section alternate" id="events">
          <whenwhere class="wow fadeIn"></whenwhere>
        </div>
        <divider icon="hotel"></divider>
        <div class="page-section" id="accommodations">
          <accommodations class="wow fadeIn"></accommodations>
        </div>
        <divider class="alternate" icon="clipboard-check"></divider>
        <div class="page-section alternate" id="rsvpsection">
          <rsvp class="wow fadeIn"></rsvp>
        </div>
        <divider icon="images"></divider>
        <div class="page-section" id="gallerysection">
          <gallery class="wow fadeIn"></gallery>
        </div>
        <div id="theend">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import countdown from "./sections/countdown";
import bridegroom from "./sections/bridegroom";
import rsvp from "./sections/rsvp";
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
    countdown,
    bridegroom,
    rsvp,
    gallery,
    whenwhere,
    headertop: header,
    navigation,
    loading,
    accommodations,
    divider
  },
  data() {
    return {
      loaded: false,
      indeterminate: true,
      progress: 0,
      counterClockwise: false,
      hideBackground: false
    };
  },
  mounted() {
    this.loaded = true;
    Pace.stop();
    new WOW.WOW().init();
  }
};
</script>

