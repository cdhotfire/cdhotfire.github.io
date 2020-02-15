<template>
  <nav class="navbar navbar-expand-lg sticky-top justify-content-center navbar-light">
    <balloon></balloon>
    <button
      class="navbar-toggler btn btn-secondary text-uppercase"
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
      <ul class="navbar-nav text-uppercase text-center">
        <li class="nav-item">
          <a class="nav-link" v-scroll-to="'#home'" @click="closeNav('home')">
            <font-awesome-icon icon="home" class="mr-2"></font-awesome-icon>Home
          </a>
        </li>      
        <li class="nav-item">
          <a class="nav-link" v-scroll-to="'#gallerysection'" @click="closeNav('gallerysection')">
            <font-awesome-icon icon="images" class="mr-2"></font-awesome-icon>Gallery
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="partyTime">
            <font-awesome-icon icon="gift" class="mr-2"></font-awesome-icon>
            {{party ? "Stop!" : "Surprise!"}}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import balloon from "./balloon";
import particles from "../../images/particles/*.png";

export default {
  methods: {
    partyTime() {
      if (!this.party)
        this.$confetti.start({
          particles: this.particles,
          particlePerFrame: 1
        });
      else this.$confetti.stop();

      this.party = !this.party;
      $(".navbar-collapse").collapse("hide");
    },
    closeNav(section) {
      var t = this;
      $(".navbar-collapse").collapse("hide");
      window.setTimeout(() => {
        t.$scrollTo("#" + section, 1);
      }, 300);
    }
  },
  components: {
    balloon
  },
  data() {
    return {
      party: false,
      particles: []
    };
  },
  mounted() {
    for (var i in particles) {
      this.particles.push({
        type: "image",
        size: 10,
        dropRate: 7,
        url: particles[i]
      });
    }
  }
};
</script>
<style>
.navbar-toggler {
  color: rgb(33, 37, 41) !important;
}

.nav-link {
  cursor: pointer;
}
</style>