<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h2 class="section-heading cursive-header">Accommodations</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="lead">A block of rooms have been reserved under:</p>
        <h3 class="text-secondary">Wong Arribas Wedding</h3>
        <p class="lead">
          Please mention our names for a discounted rate using the special rate code
          <b
            class="text-primary lead"
          >W14</b> at:
        </p>
        <p class="lead text-dark">
          Orlando Marriott Lake Mary
          <br />1501 International Parkway, Lake Mary, FL 32746
          <br />1-800-380-7724
        </p>
        <p class="lead">You may also click the button below to reserve your room:</p>
        <button class="btn btn-primary btn-lg mb-4" @click="reservation">Reserve Here!</button>
        <div class="text-info h2 font-italic">
          Please book by October 25th, 2019
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    reservation() {
      window.location =
        "https://www.marriott.com/events/start.mi?id=1563800764754&key=GRP";
    }
  }
};
</script>