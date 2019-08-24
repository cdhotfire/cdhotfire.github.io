<template>
  <div>
    <headertop></headertop>
    <nav
      class="navbar navbar-expand-lg navbar-dark navbar-shrink nav-fill justify-content-center"
      id="mainNav"
    >
      <ul class="navbar-nav text-uppercase">
        <li class="nav-item">
          <a class="nav-link" href="#whenwheresection" v-smooth-scroll>
            <font-awesome-icon icon="map-marked-alt" class="mr-2"></font-awesome-icon>When/Where
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#gallerysection" v-smooth-scroll>
            <font-awesome-icon icon="images" class="mr-2"></font-awesome-icon>Gallery
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#rsvpsection" v-smooth-scroll>
            <font-awesome-icon icon="clipboard-check" class="mr-2"></font-awesome-icon>RSVP
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="party">
            <font-awesome-icon icon="clipboard-check" class="mr-2"></font-awesome-icon>Party Time
          </a>
        </li>
      </ul>
    </nav>
    <div class="page-section bg-light">
      <bridegroom></bridegroom>
    </div>
    <div class="page-section">
      <countdown></countdown>
    </div>
    <div class="page-section text-center bg-light" id="whenwheresection">
      <whenwhere></whenwhere>
    </div>
    <div class="page-section" id="gallerysection">
      <gallery></gallery>
    </div>
    <div class="page-section bg-light" id="rsvpsection">
      <rsvp></rsvp>
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

export default {
  components: {
    countdown: countdown,
    bridegroom: bridegroom,
    rsvp: rsvp,
    gallery: gallery,
    whenwhere: whenwhere,
    headertop: header
  },
  data() {
  },
  methods: {
    party() {
      this.$confetti.start({});
    }
  }
};
</script>