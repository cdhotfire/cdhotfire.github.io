<template>
  <div class="header">
    <div class="header-fixed">
      <transition name="fade">
        <img
          v-lazy="image"
          class="header-image"
          :class="'header-image-' + imageIndex"
          @load="loaded"
        />
      </transition>
      <div class="image-overlay"></div>
    </div>
    <div class="flowers"></div>
    <header-text></header-text>
  </div>
</template>
<script>
import "../../library/sakura/jquery-sakura.min.js";
import images from "../../images/header/*.jpg";
import objectFitImages from "object-fit-images";
import headerText from "./headertext";

export default {
  data: () => ({
    images: [],
    image: "",
    imageIndex: 11
  }),
  components: {
    headerText
  },
  created() {
    this.images = Object.values(images);
    this.changeImage();    
  },
  methods: {
    changeImage() {
      this.image = this.images[this.imageIndex++];
      if (this.imageIndex == this.images.length) this.imageIndex = 0;
      objectFitImages("img.header-image-" + this.imageIndex);
    },
    loaded() {      
    }
  },
  mounted() {
    // setInterval(this.changeImage, 4000);
    $(".flowers").sakura("start", { className: "particles" });
  }
};
</script>
<style sccs>
.header {
  height: 100vh;
}

.header-fixed {
  position: fixed;
  z-index: -1;
}

.header-image {
  filter: blur(0.5px);
  object-fit: cover;
  width: 100vw;
  height: 100vh;
}

.header-image-1 {
  object-position: 45% 30%;
  font-family: "object-fit: cover; object-position: 45% 30%;";
}

.header-image-2 {
  object-position: 55% center;
  font-family: "object-fit: cover; object-position: 55% center;";
}

.header-image-3 {
  object-position: center center;
  font-family: "object-fit: cover; object-position: center center;";
}

.header-image-4 {
  object-position: center 30%;
  font-family: "object-fit: cover; object-position: center 30%;";
}

.header-image-5 {
  object-position: 30% 30%;
  font-family: "object-fit: cover; object-position: 30% 30%;";
}

.header-image-6 {
  object-position: center center;
  font-family: "object-fit: cover; object-position: center center;";
}

.header-image-7 {
  object-position: 72% 30%;
  font-family: "object-fit: cover; object-position: 72% 30%;";
}

.header-image-8 {
  object-position: 55% 30%;
  font-family: "object-fit: cover; object-position: 55% 30%;";
}

.header-image-9 {
  object-position: 65% 30%;
  font-family: "object-fit: cover; object-position: 65% 30%;";
}

.header-image-10 {
  object-position: 55% 30%;
  font-family: "object-fit: cover; object-position: 55% 30%;";
}

.header-image-11 {
  object-position: 72% 30%;
  font-family: "object-fit: cover; object-position: 72% 30%;";
}

.header-image-12 {
  object-position: center 30%;
  font-family: "object-fit: cover; object-position: center 30%;";
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
  position: absolute;
  pointer-events: none;
  background: white;
  background: linear-gradient(to bottom, #feffff 0%, #d2ebf9 100%);
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