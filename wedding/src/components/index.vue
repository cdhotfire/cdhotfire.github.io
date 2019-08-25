<template>
  <div>
    <headertop></headertop>
    <navigation></navigation>
    <div class="page-section light" id="home">
      <bridegroom></bridegroom>
      <countdown class="mt-5"></countdown>
    </div>
    <div class="page-section text-center bg-light" id="events">
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
import navigation from "./sections/navigation";

export default {
  components: {
    countdown,
    bridegroom,
    rsvp,
    gallery,
    whenwhere,
    headertop: header,
    navigation
  }
};
</script>