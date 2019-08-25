<template>
  <div class="container">
    <div class="row justify-content-center countdown-counter"></div>
  </div>
</template>
<script>
import "jquery-countdown/dist/jquery.countdown.js";

export default {
  mounted() {
    $(".countdown-counter").countdown("2019/11/16 17:00", function(event) {
      var days =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%D") +
        "<div class='countdown-description'>days</div></div></div>";
      var hours =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%H") +
        "<div class='countdown-description'>hours</div></div></div>";
      var minutes =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%M") +
        "<div class='countdown-description'>minutes</div></div></div>";
      var seconds =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%S") +
        "<div class='countdown-description'>seconds</div></div></div>";
      $(this).html(days + hours + minutes + seconds);
    });
  }
};
</script>
<style>
.countdown {
  background-color: #ecf2f0;
}

.countdown-date {
  font-size: 3rem;
  margin-top: 0;
  text-align: center;
}

.countdown-description {
  font-size: 1rem;
  line-height: 1.75;
  color: #6c757d !important;
  text-align: center;
}
</style>