<template>
    <div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebDirectionsPageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebDirectionsPageBody">
        </quill-editor>
        <div class="row" v-show="position">
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="location" class="form-control-label">Starting From</label>
                    <input class="form-control" id="location" name="location" type="text" v-model="location" placeholder="Start Location">
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="courtaddresses" class="form-control-label">Court Locations</label>
                    <select class="form-control" id="courtaddresses" name="courtaddresses" v-model="courtaddress">
                        <option v-for="address in model.JurorMapAddress" :value="address" :key="address">
                            {{address}}
                        </option>
                    </select>
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-primary btn-lg" v-on:click="getroute">
                        <font-awesome-icon icon="road" size="lg" fixed-width></font-awesome-icon>
                        Get Route
                    </button>
                    <button type="button" class="btn btn-primary btn-lg" v-on:click="printroute">
                        <font-awesome-icon icon="print" size="lg" fixed-width></font-awesome-icon>
                        Print Map
                    </button>
                </div>
            </div>
        </div>
        <div class="row" v-show="position">
            <div class="col-sm-6">
                <div id="dvMap"></div>
            </div>
            <div class="col-sm-6" id="print">
                <div id="dvPanel"></div>
                <div v-if="parkingdirectionsvisible">
                    {{model.HomeParkingInformation}}
                </div>
            </div>
        </div>
        <div v-if="!position" class="position mt-4">
            <div>
                <div class="pin"></div>
                <div class="pin-effect"></div>
            </div>
            Getting Current Location...
        </div>
        <div style="display: none;">
            <div class="settingTextClass01">
                <b>Parking Information:</b>
                <br> You will be able to park your automobile for free in the courthouse garage located just across the street from the court house. The Garage opens at 5:20 AM and will be available for jurors throughout the duration of service.
            </div>
        </div>
        <br>
    </div>
</template>
<script>
import googleMaps from "google-maps";
import directionsService from "services/directions";
import print from "print-html-element";

export default {
  data() {
    return {
      model: {},
      maps: {
        service: null,
        render: null,
        map: null
      },
      position: false,
      location: null,
      courtaddress: null,
      parkingdirectionsvisible: false
    };
  },
  methods: {
    initMap() {
      var _this = this;
      this.maps.service = new google.maps.DirectionsService();
      new google.maps.places.SearchBox(document.getElementById("location"));
      this.maps.render = new google.maps.DirectionsRenderer({
        draggable: true
      });

      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => _this.setLocation(_this, position),
          error => _this.noLocation(_this)
        );
      } else this.noLocation(this);
    },
    noLocation(_this) {
      _this.position = true;
      _this.setupMap(_this);
      if (_this.courtaddress && _this.location) _this.getroute();
    },
    setLocation(_this, position) {
      _this.position = true;
      _this.location =
        position.coords.latitude + "," + position.coords.longitude;
      _this.setupMap(_this);
      _this.getroute();
    },
    setupMap(_this) {
      _this.maps.map = new google.maps.Map(document.getElementById("dvMap"), {
        zoom: 7
      });

      _this.maps.render.setMap(_this.maps.map);
      _this.maps.render.setPanel(document.getElementById("dvPanel"));
    },
    route() {
      getroute();
    },
    getroute() {
      var _this = this;
      var request = {
        origin: this.location,
        destination: this.courtaddress,
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.maps.service.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          _this.maps.render.setDirections(response);
        }
      });
    },
    printroute() {
      this.parkingdirectionsvisible = true;
      this.$nextTick(() => {
        try {
          this.$nextTick(() => {
            print.printElement(document.getElementById("print"));
          });
        } finally {
          this.parkingdirectionsvisible = false;
        }
      });
    }
  },
  beforeCreate() {
    directionsService.model(this).then(result => {
      this.model = result.data;
      this.location = this.model.JurorMapAddressDefaultStart;
      this.courtaddress =
        this.model.JurorMapAddress.length > 0
          ? this.model.JurorMapAddress[0]
          : null;
      this.$store.commit("loaded");
    });
  },
  created() {
    var _this = this;
    googleMaps.KEY = "AIzaSyBBSR9OrDp8blZMY4XWGu601IZMISeOfQY";
    googleMaps.LIBRARIES = ["places"];
    googleMaps.load(google => {
      _this.initMap();
    });
  },
  destroyed() {
    googleMaps.release();
  }
};
</script>
<style scoped>
.position {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
}

.pin {
  width: 25px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 63px;
  border: 2px solid #fff;
  border-radius: 50%;
  z-index: 1000;
}

.pin-effect {
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 100px;
  margin-top: -63px;
  border-radius: 50%;
  opacity: 0;
  animation: pulsate 1200ms ease-out infinite;
}

@keyframes pulsate {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>