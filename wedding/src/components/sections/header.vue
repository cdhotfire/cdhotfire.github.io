<template>
  <div class="header">
    <div class="header-fixed">
      <transition name="fade">
        <img :src="image" class="header-image" :loaded="imageLoaded" @load="loaded" />
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
import headerText from "./headerText";

export default {
  data: () => ({
    images: [],
    image: "",
    imageIndex: 1,
    imageLoaded: false
  }),
  components: {
      headerText
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
    objectFitImages("img.header-image");
    setInterval(this.changeImage, 4000);
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
  filter: blur(.5px);
  object-fit: cover;
  object-position: 50% 80%;
  font-family: "object-fit: cover; object-position: 50% 80%;";
  width: 100vw;
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