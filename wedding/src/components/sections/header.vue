<template>
  <div class="header">
    <parallax :fixed="true">
      <transition name="fade">
        <img :src="image" class="header-image" :loaded="imageLoaded" @load="loaded" />
      </transition>
      <div class="image-overlay"></div>
    </parallax>
    <div class="header-text">
      <div class="header-names display-3">
        <div>Isidro</div>
        <div>
          <img src="../../images/together.png" class="img-fluid together" />
        </div>
        <div>Jocelyn</div>
      </div>
      <div class="h6 mt-2">November 16, 2019</div>
    </div>
    <div class="flowers"></div>
  </div>
</template>
<script>
import "../../library/sakura/jquery-sakura.min.js";
import Parallax from "vue-parallaxy";
import images from "../../images/header/*.jpg";
import objectFitImages from "object-fit-images";

export default {
  data: () => ({
    images: [],
    image: "",
    imageIndex: 1,
    imageLoaded: false
  }),
  components: {
    Parallax
  },
  created() {
    this.images = Object.values(images);
    this.image = this.images[0];
  },
  methods: {
    changeImage() {
      this.imageLoaded = false;
      this.image = this.images[this.imageIndex++];
      if (this.imageIndex == this.images.length) this.imageIndex = 0;
    },
    loaded() {
      this.imageLoaded = true;
    }
  },
  mounted() {
    objectFitImages();
    setInterval(this.changeImage, 4000);
    $(".flowers").sakura("start", { className: "particles" });
  }
};
</script>
<style sccs>
.header {
  height: 100vh;
}

.flowers {
  width: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  position: absolute;
  height: 100%;
}

.particles {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#feffff+0,d2ebf9+100;Blue+3D+%2312 */
  background: #feffff;
  /* Old browsers */
  background: -moz-linear-gradient(top, #feffff 0%, #d2ebf9 100%);
  /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #feffff 0%, #d2ebf9 100%);
  /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #feffff 0%, #d2ebf9 100%);
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#feffff', endColorstr='#d2ebf9', GradientType=0);
  /* IE6-9 */
  position: absolute;
  pointer-events: none;
}

.header-image {
  filter: blur(0.75px);
  object-fit: cover;
  font-family: "object-fit: cover;";
}

.header-text {
  position: absolute;
  width: 100%;
  top: 40%;
  left: 0;
  text-align: center;
  color: white;
  text-shadow: -1px 0 rgba(0, 0, 0, 0.5), 0 1px rgba(0, 0, 0, 0.5),
    1px 0 rgba(0, 0, 0, 0.5), 0 -1px rgba(0, 0, 0, 0.5);
}

.header-names {
  font-family: "Parisienne", cursive;
  opacity: 0.9;
}

.header-names > div {
  margin-top: -1rem;
}

.together {
  height: 6rem;
}

.header-image[loaded="true"] {
  opacity: 0;
  animation-name: fadein;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-direction: normal;
  animation-timing-function: ease-in-out;
}

@keyframes fadein {
  0% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}
</style>