<template>
  <div class="balloon">
    <img class="balloon-image wow fadeInLeft" src="../../images/balloon.png" />
    <theend></theend>
  </div>
</template>
<script>
import theend from "./../sections/theend";
import ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import { TweenMax } from "gsap/TweenMax";

export default {
  components: {
    theend
  },
  mounted() {
    var controller = new ScrollMagic.Controller();

    var height = $("body").height() - $("body").width() * 0.16;
    var width = $(window).width();
    var ydif = height / 10;

    var values = [];
    for (var i = 0; i < 10; i++) {
      values.push({
        x: (i * (width / 150)) % (width / 100),
        y: height - i * ydif
      });
    }

    var tween = TweenMax.to(".balloon", 1, {
      css: {
        bezier: {
          values: values.reverse()
        }
      }
    });

    var scene = new ScrollMagic.Scene({
      triggerElement: ".balloon-trigger",
      duration: () => $("body").height() - $("body").width() * 0.16,
      offset: 0
    })
      .setTween(tween)
      .addTo(controller);
  }
};
</script>
<style>
.balloon {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 10%;
  max-width: 150px;
  pointer-events: none;
  opacity: 0.8;
}

.balloon-image {
  width: 100%;
}
</style>