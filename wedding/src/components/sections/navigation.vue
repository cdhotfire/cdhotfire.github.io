<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark navbar-shrink nav-fill sticky-top justify-content-center"
    id="mainNav"
  >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <font-awesome-icon icon="compass" class="mr-2"></font-awesome-icon>Navigation
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
      <ul class="navbar-nav text-uppercase">
        <li class="nav-item">
          <a class="nav-link" href="#" v-scroll-to="'#home'">
            <font-awesome-icon icon="home" class="mr-2"></font-awesome-icon>Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-scroll-to="'#events'">
            <font-awesome-icon icon="map-marked-alt" class="mr-2"></font-awesome-icon>Events
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-scroll-to="'#gallerysection'">
            <font-awesome-icon icon="images" class="mr-2"></font-awesome-icon>Gallery
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-scroll-to="'#rsvpsection'">
            <font-awesome-icon icon="clipboard-check" class="mr-2"></font-awesome-icon>RSVP
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="partyTime">
            <font-awesome-icon icon="gift" class="mr-2"></font-awesome-icon>
            {{party ? "Stop The Party" : "Party Time"}}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    partyTime() {
      if (!this.party) this.$confetti.start({});
      else this.$confetti.stop();

      this.party = !this.party;
    }
  },
  data() {
    return {
      party: false
    };
  }
};
</script>
<style>
.navbar-toggler {
  color: rgb(33, 37, 41) !important;
}
</style>