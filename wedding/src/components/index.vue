<template>
  <div>
    <div class="header">
      <div class="jarallax">
        <img class="header-image jarallax-img" src="../images/engagement/engagement4.jpg" />
        <div class="image-overlay"></div>
      </div>
      <div class="header-text">
        <div class="header-names display-1">
          <div>Isidro</div>
          <div>
            <img src="../images/together.png" class="img-fluid together" />
          </div>
          <div>Jocelyn</div>
        </div>
        <div class="h4">November 16, 2019</div>
      </div>
      <div class="flowers"></div>
    </div>
    <nav
      class="navbar navbar-expand-lg navbar-dark navbar-shrink nav-fill justify-content-center"
      id="mainNav"
    >
      <ul class="navbar-nav text-uppercase">
        <li class="nav-item">
          <a class="nav-link" href="#whenwheresection" v-smooth-scroll>
            <font-awesome-icon icon="map-marked-alt" class="mr-2"></font-awesome-icon>When/Where
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#gallerysection" v-smooth-scroll>
            <font-awesome-icon icon="images" class="mr-2"></font-awesome-icon>Gallery
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#rsvpsection" v-smooth-scroll>
            <font-awesome-icon icon="clipboard-check" class="mr-2"></font-awesome-icon>RSVP
          </a>
        </li>
      </ul>
    </nav>
    <div class="page-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading cursive-header">Join our celebration</h2>
          </div>
        </div>
        <hr />
        <div class="row justify-content-center mt-5">
          <div class="col-auto">
            <div class="team-member">
              <img class="mx-auto rounded-circle" />
              <h4>Isidro Arribas Jr</h4>
              <p class="text-muted">Groom</p>
            </div>
          </div>
          <div class="col-sm-6 col-md-auto"></div>
          <div class="col-auto">
            <div class="team-member">
              <img class="mx-auto rounded-circle" />
              <h4>Jocelyn Pui-Yin Wong</h4>
              <p class="text-muted">Bride</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-light page-section">
      <div class="row justify-content-center countdown-counter"></div>
    </div>
    <div class="page-section text-center" id="whenwheresection">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-heading cursive-header">When and Where</h2>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-sm-12 col-lg-6">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content">
                    <i class="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img class="img-fluid" src alt />
              </a>
              <div class="portfolio-caption">
                <h4>Chinese Tea Ceremony</h4>
                <p class="text-muted">
                  Saturday, November 16, 2019 — 5:00 PM
                  <br />Orlando Marriott Lake Mary
                  <br />1501 International Pkwy, Lake Mary, FL 32746
                </p>
              </div>
            </div>
            <div class="map embed-responsive">
              <iframe
                class="embed-responsive-item"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?q=Orlando%20Marriott%20Lake%20Mary&t=&z=14&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
          <div class="col-sm-12 col-lg-6">
            <div class="portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content">
                    <i class="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img class="img-fluid" src alt />
              </a>
              <div class="portfolio-caption">
                <h4>Chinese Banquet</h4>
                <p class="text-muted">
                  Sunday, November 17, 2019 — 5:00 PM
                  <br />Golden Lotus Chinese Restaurant
                  <br />8365 S John Young Pkwy, Orlando, FL 32819
                </p>
              </div>
            </div>
            <div class="map embed-responsive">
              <iframe
                class="embed-responsive-item"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?q=Golden%20Lotus%20Chinese%20Restaurant&t=&z=14&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-section bg-light" id="gallerysection">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-auto">
            <h2 class="section-heading cursive-header">Gallery</h2>
          </div>
        </div>
        <hr />
        <div class="lightgallery gallery">
          <div class="mb-3" v-for="image in images" :key="image">
            <a :data-src="image" class="gallery-item">
              <img :src="image" class="img-fluid" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="page-section" id="rsvpsection">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-auto">
            <h2 class="section-heading cursive-header">Rsvp</h2>
          </div>
        </div>
        <hr />
        <div class="row justify-content-center">
          <div class="col embed-responsive embed-responsive-1by1">
            <iframe
              class="embed-responsive-item"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdv42tTIWmhnemR-msYth6R-Pw0GZijM5ZVm0axpnk4DF75fA/viewform?embedded=true"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >Loading…</iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../library/sakura/jquery-sakura.min.js";
import "jarallax/dist/jarallax.js";
import "jquery-countdown/dist/jquery.countdown.js";
import objectFitImages from "object-fit-images";
import "lightgallery/dist/js/lightgallery.js";
import "lightgallery/dist/css/lightgallery.css";
import images from "../images/engagement/*.jpg";

export default {
  data: function() {
    return {
      images: []
    };
  },
  created: function() {
    this.images = images;
  },
  mounted: function() {
    objectFitImages();

    $(".flowers").sakura("start", { className: "particles" });
    $(".jarallax").jarallax({ speed: 0 });
    $(".countdown-counter").countdown("2019/11/16", function(event) {
      var months =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%m") +
        "<div class='countdown-description'>month</div></div></div>";
      var days =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%d") +
        "<div class='countdown-description'>day</div></div></div>";
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
      $(this).html(months + days + hours + minutes + seconds);
    });
    $(".lightgallery").lightGallery({
      selector: ".gallery-item"
    });
  }
};
</script>