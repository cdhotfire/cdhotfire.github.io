<template>
	<div id="calendar">
		<quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebExcusalPageHeading">
		</quill-editor>
		<starline></starline>
		<quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebExcusalPageBody">
		</quill-editor>
		<div v-show="!(selected || newitem)" class="mt-4">
			<div class="text-center mb-2">
				<b-button size="lg" variant="success" @click="addevent">New Event</b-button>
			</div>
			<full-calendar ref="calendar" class="bootstrap4" :events="getevents" @event-selected="eventselected" @event-drop="eventdrop" :config="calendarconfig"></full-calendar>
		</div>
		<div v-if="selected || newitem" class="text-center mt-4">
			<b-button variant="danger" v-if="!newitem" class="mb-2" size="lg" @click="deleteevent">Delete Event</b-button>
			<div class="row justify-content-sm-center">
				<div class="col-sm-6">
					<validation-item :value.sync="selecteddate" type="date" display="Event Date" :valid="'required'" name="eventdate"></validation-item>
				</div>
			</div>
			<div class="row justify-content-sm-center">
				<div class="col-sm-6">
					<validation-item :value.sync="selectedeventtype" type="select" :options="model.EventTypes" display="Event Type" :valid="'required'" name="eventtype"></validation-item>
				</div>
			</div>
			<div class="row justify-content-sm-center">
				<div class="col-sm-6">
					<validation-item :value.sync="selectedevent.casenumber" type="text" display="Case Number" :valid="'required'" name="casenumber"></validation-item>
				</div>
			</div>
			<div class="row justify-content-sm-center">
				<div class="col-sm-6 form-group">
					<label class="form-control-label">
						Description
					</label>
					<input class="form-control" placeholder="Description" v-model="selectedevent.description" />
				</div>
			</div>
			<div class="row justify-content-sm-center">
				<div class="col-sm-6">
					<validation-item :value.sync="selectedjudge" type="select" :options="model.Judges" display="Judge" :valid="'required'" name="judge"></validation-item>
				</div>
			</div>
			<div class="row justify-content-sm-center">
				<div class="col-sm-6 form-group">
					<label class="form-control-label">
						Court Room
					</label>
					<v-select placeholder="Court Room" v-model="selectedcourtroom" :options="model.CourtRooms"></v-select>
				</div>
			</div>
			<div class="row justify-content-sm-center">
				<div class="col-sm-6">
					<validation-item :value.sync="selectedevent.requested" type="number" display="Jurors Requested" :valid="'numeric|min_value:0'" name="requested"></validation-item>
				</div>
			</div>
			<!--<div class="row justify-content-sm-center">
                <div class="col-sm-6">
                    <validation-item :value.sync="selectedevent.supplied" type="number" display="Jurors Supplied" :valid="'numeric|min_value:0'" name="supplied"></validation-item>
                </div>
            </div>-->
			<div class="row justify-content-sm-center">
				<div class="col-sm-6 form-group">
					<label class="form-control-label">
						Cancelled
					</label>
					<div>
						<b-form-checkbox type="checkbox" v-model="selectedevent.cancelled" />
					</div>
				</div>
			</div>
			<b-button variant="primary" @click="save" :disabled="errors.any() || processing">
				<font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
				Save
			</b-button>
			<b-button variant="danger" :disabled="processing" @click="cancel">Cancel</b-button>
		</div>
	</div>
</template>
<script>
import calendarService from "services/calendar";
import { FullCalendar } from "vue-full-calendar";
import colors from "assets/colorsdark.json";
import moment from "moment";
import tinycolor from "tinycolor2";
import validationItem from "components/plugins/validationitem.vue";
import vSelect from "vue-select";
import { dom } from "@fortawesome/fontawesome-svg-core";

var calendarPage = {};
export default {
  data() {
    return {
      model: {},
      calendarControl: {},
      selectedevent: {},
      loading: false,
      selected: false,
      newitem: false,
      processing: false,
      errorList: {
        custom: {
          eventdate: {
            required: "Event Date is required.",
            date_format: "Event Date is not in the correct format."
          },
          judge: {
            required: "Judge is required."
          },
          eventtype: {
            required: "Event Type is required."
          },
          supplied: {
            numeric: "Jurors Supplied must be a number.",
            min_value: "Jurors Supplied must be greater than or equal to 0."
          },
          requested: {
            numeric: "Jurors Requested must be a number.",
            min_value: "Jurors Requested must be greater than or equal to 0."
          },
          casenumber: {
            required: "Case Number is required."
          }
        }
      },
      calendarconfig: {
        themeSystem: "bootstrap4",
        defaultView: "month",
        handleWindowResize: true,
        selectable: false,
        header: {
          left: "today",
          center: "title",
          right: "prev,next"
        },
        windowResize(view) {
          calendarPage.resizecalendar(view.name, view.calendar);
        },
        eventAfterAllRender() {
          dom.i2svg();
        },
        eventRender(event, element) {
          let einfo = [
            event.judge,
            event.eventtype,
            event.courtroom,
            event.casenumber,
            event.description,
            "Req - " + event.requested + " Sup - " + event.supplied
          ]
            .filter(x => x)
            .join("<br/>");
          let icon = "";
          let cl = "";
          let backcolor = colors[event.judgeid % colors.length];
          let textcolor = "white";
          if (event.cancelled) {
            einfo += "<br/>(CANCELLED)";
            icon += "<i class='fa-pull-left fas fa-times-circle fa-fw'></i>";
            cl += " event-cancelled";
          }

          if (!event.editable) {
            einfo += "<br/>(APPROVED)";
            einfo += "<br/>(READ ONLY)";
            icon += "<i class='fa-pull-left fas fa-check-circle fa-fw'></i>";
            cl += " event-approved";
            const fcolor = tinycolor.mix(backcolor, "black", 10).toString();
            const scolor = tinycolor(fcolor)
              .darken(10)
              .toString();

            backcolor =
              "repeating-linear-gradient(45deg," +
              fcolor +
              "," +
              fcolor +
              " 5px," +
              scolor +
              " 5px," +
              scolor +
              " 10px)";
            textcolor = tinycolor(textcolor)
              .darken(20)
              .toString();
          }

          element
            .addClass("btn btn-event" + cl)
            .css({
              background: backcolor,
              color: textcolor,
              border:
                "1px solid " +
                tinycolor(colors[event.judgeid % colors.length])
                  .darken(20)
                  .toString()
            })
            .html(
              icon +
                "<span class='btn-event-monthinfo'>" +
                event.judge +
                " - " +
                event.requested +
                "</span><span class='btn-event-dayinfo'>" +
                einfo +
                "</span>"
            );

          if ($(window).width() >= 768)
            element.tooltip({
              html: true,
              title: einfo,
              placement: "auto",
              trigger: "hover"
            });
        },
        eventDestroy(event, element, view) {
          element.tooltip("dispose");
        }
      }
    };
  },
  computed: {
    selecteddate: {
      get() {
        return this.selectedevent.start.format("YYYY-MM-DD");
      },
      set(val) {
        this.selectedevent.start = new moment(val);
      }
    },
    selectedjudge: {
      get() {
        return this.selectedevent.judge;
      },
      set(val) {
        if (!val) {
          this.selectedevent.judgeid = 0;
          this.selectedevent.judge = "";
          return;
        }

        if (val.label) {
          this.selectedevent.judgeid = val.value;
          this.selectedevent.judge = val.label;
        } else this.selectedevent.judge = val;
      }
    },
    selectedcourtroom: {
      get() {
        return this.selectedevent.courtroom;
      },
      set(val) {
        if (!val) {
          this.selectedevent.courtroomid = 0;
          this.selectedevent.courtroom = "";
          return;
        }

        if (val.label) {
          this.selectedevent.courtroom = val.label;
          this.selectedevent.courtroomid = val.value;
        } else this.selectedevent.courtroom = val;
      }
    },
    selectedeventtype: {
      get() {
        return this.selectedevent.eventtype;
      },
      set(val) {
        this.selectedevent.eventtype = val;
      }
    }
  },
  components: { FullCalendar, validationItem, vSelect },
  methods: {
    resizecalendar(view, viewCalendar, calendar) {
      const ww = $(window).width();
      const v = ww <= 768 ? "listMonth" : "month";

      if (v != view)
        if (viewCalendar) viewCalendar.changeView(v);
        else if (calendar) calendar.fullCalendar("changeView", v);
    },
    getevents(start, end, timezone, callback) {
      swal({
        title: "Loading Case Events",
        onOpen: () => swal.showLoading()
      });

      start = start.format("MM-DD-YYYY");
      end = end.format("MM-DD-YYYY");
      calendarService
        .getevents(this, start, end)
        .then(result => {
          callback(result.data);
          swal.close();
        })
        .catch(() => swal.close());
    },
    eventdrop(event) {
      this.saveevent(event);
    },
    eventselected(event, jsEvent, view) {
      if (!event.editable) return;

      this.selectedevent = event;
      this.selected = true;
    },
    cancel() {
      this.selected = false;
      this.newitem = false;
    },
    save() {
      this.saveevent(this.selectedevent, true);
    },
    deleteevent() {
      const _t = this;
      swal({
        title: "Delete Case Event",
        text: "Are you sure you want to delete this case event?",
        type: "warning",
        showCancelButton: true,
        canceButtonText: "No",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value)
          calendarService.deleteevent(_t, _t.selectedevent.id).then(() => {
            _t.selected = false;
            _t.$refs.calendar.$emit("refetch-events");
            swal("Case Event", "Case Event Deleted Successfully", "success");
          });
      });
    },
    addevent() {
      this.selectedevent = { start: new moment(new Date()) };
      this.newitem = true;
    },
    saveevent(event, refresh) {
      this.$validator.validateAll().then(validateresult => {
        if (!validateresult) return;

        const e = {
          id: event.id,
          start: event.start.format("MM-DD-YYYY"),
          eventtype: event.eventtype,
          description: event.description,
          courtroomid: event.courtroomid,
          judgeid: event.judgeid,
          requested: event.requested,
          //supplied: event.supplied,
          casenumber: event.casenumber,
          cancelled: event.cancelled
        };

        this.processing = true;

        calendarService
          .saveevent(this, e)
          .then(() => {
            swal("Case Event", "Saved Successfully", "success");

            this.newitem = false;
            this.selected = false;

            if (refresh) this.$refs.calendar.$emit("refetch-events");
            else this.$refs.calendar.$emit("rerender-events");
          })
          .finally(() => (this.processing = false));
      });
    }
  },
  mounted() {
    this.$validator.localize("en", this.errorList);
    calendarPage = this;
    window.setTimeout(() => {
      calendarPage.calendarControl = $(calendarPage.$refs.calendar.$el);
      calendarPage.calendarControl.fullCalendar("render");
      calendarPage.resizecalendar("month", null, calendarPage.calendarControl);
    }, 100);
  },
  beforeCreate() {
    calendarService.model(this).then(result => {
      this.model = result.data;
      this.$store.commit("loaded");
    });
  }
};
</script>
<style>
/* fix for IE */
.flatpickr-calendar:not(.open) {
  display: none !important;
}
</style>