<template>
</template>
<script>
import ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import { TimelineMax } from "gsap/TweenMax";
export default {
  mounted() {
    var controller = new ScrollMagic.Controller();
    var tween = new TimelineMax()
      .from(".thank-you", 0.5, { opacity: 0 })
      .to(".thank-you", 0.5, {
        opacity: 1
      });

    var scene = new ScrollMagic.Scene({
      triggerElement: "#theend",
      triggerHook: 1
    })
      .setTween(tween)
      .addTo(controller);
  }
};
</script>
<style>
.the-end {
  position: absolute;
  left: 100%;
  bottom: 0;
}
</style>