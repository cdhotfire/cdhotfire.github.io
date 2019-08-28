<template>
  <img class="balloon wow fadeInLeft" src="../../images/balloon.png" />
</template>
<script>
import ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import { TweenMax, Power1, TimelineLite } from "gsap/TweenMax";

export default {
  mounted() {
    var flightpath = {
      curviness: 1.25,
      autoRotate: false,
      values: [
        { x: 5, y: 0 },
        { x: 10, y: $(window).height() / 10 },
        { x: 15, y: $(window).height() / 9 },
        { x: 10, y: $(window).height() / 8 },
        { x: 5, y: $(window).height() / 7 },
        { x: 15, y: $(window).height() / 6 },
        { x: 10, y: $(window).height() / 5 },
        { x: 5, y: $(window).height() / 4 },
        { x: 10, y: $(window).height() / 3 },
        { x: 15, y: $(window).height() / 2 },
        { x: 10, y: $(window).height() }
      ]
    };
    // init controller
    var controller = new ScrollMagic.Controller();

    // create tween
    var tween = new TimelineMax().add(
      TweenMax.to($(".balloon"), 0.5, {
        css: { bezier: flightpath },
        ease: Power1.easeInOut
      })
    );

    // build scene
    var scene = new ScrollMagic.Scene({
      triggerElement: ".balloon-trigger",
      duration: "1200%",
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
  width: 10%;
  max-width: 150px;
  z-index: 0;
  pointer-events: none;
}
</style>