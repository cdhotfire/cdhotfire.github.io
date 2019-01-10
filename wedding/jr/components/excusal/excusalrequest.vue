<template>
  <div>
    <quill-editor v-bind:editable="model.Editable" v-model="model.Heading" settingkey="WebExecusalRequestPageHeading">
    </quill-editor>
    <starline></starline>
    <quill-editor v-bind:editable="model.Editable" v-model="model.Body" settingkey="WebExecusalRequestPageBody">
    </quill-editor>
    <validation-section :fm.sync="formData" :emailRequired="model.WebRequireEmailAddress" :showEmail="true"></validation-section>
    <div class="row justify-content-md-center">
      <div class="col-sm-6 col-md-6 col-lg-3">
        <validation-item mask="(###) ###-####" :value.sync="formData.phonenumber" display="Phone Number" :valid="'phonenumber'" name="phonenumber"></validation-item>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-4">
        <div class="form-group">
          <label class="form-control-label">
            Notifications
          </label>
          <div>
            <b-form-radio-group buttons button-variant="primary" v-model="formData.notifylevel">
              <b-form-radio value="0">None</b-form-radio>
              <b-form-radio value="1">Email</b-form-radio>
              <b-form-radio :disabled="!formData.phonenumber || errors.has('phonenumber')" value="2">Text</b-form-radio>
              <b-form-radio :disabled="!formData.phonenumber || errors.has('phonenumber')" value="3">Email and Text</b-form-radio>
            </b-form-radio-group>
            <small class="text-danger" v-if="!formData.phonenumber || errors.has('phonenumber')">
              <sup>(must have valid phone number to selected texting)</sup>
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mb-3">
      <b-button :pressed.sync="swear" variant="primary">
        <font-awesome-icon :icon="swear ? 'check-square' : 'square'" fixed-width></font-awesome-icon>
        I swear or affirm to tell the truth about my qualifications or exemptions from jury service.
      </b-button>
    </div>
    <transition name="transition">
      <div v-if="swear">
        <hr class="mb-3" />
        <small v-if="errors.has('selection')" class="help-block text-danger">{{errors.first('selection')}}</small>
        <b-form-radio-group v-model="formData.selected" stacked v-validate="'required'" name="selection" :class="{ 'is-invalid': errors.has('selection') }">
          <div class="mb-2" v-for="(group, i) in model.Groups" :key="i">
            <b-form-radio :value="group" class="mb-2">
              <h5 class="ml-2">
                {{group.WebGroupDescription}}
              </h5>
            </b-form-radio>
            <div v-for="(item, i1) in group.Items" :key="i1">
              {{item.WebItemDescription}}
              <div v-if="item.DateField">
                <div v-if="formData.selected && formData.selected.WebGroupDescription === group.WebGroupDescription">
                  <flat-pickr :config="datepickerconfig" class="form-control form-control-event" :name="'selectionText' + item.ProgramControl" v-model="formData.extraInfo[group.WebGroupDescription]" v-validate="'required'" :class="{ 'is-invalid': errors.has('selectionText' + item.ProgramControl) }"></flat-pickr>
                  <small v-if="errors.has('selectionText' + item.ProgramControl)" class="help-block text-danger">This field is required</small>
                </div>
                <div v-else>
                  <flat-pickr :config="datepickerconfig" class="form-control form-control-event" v-model="formData.extraInfo[group.WebGroupDescription]"></flat-pickr>
                </div>
              </div>
              <div v-else-if="item.WebRequireExtraInfo">
                <div v-if="formData.selected && formData.selected.WebGroupDescription === group.WebGroupDescription">
                  <textarea v-model="formData.extraInfo[group.WebGroupDescription]" class="form-control" :name="'selectionText' + item.ProgramControl" v-validate="'required'" :class="{ 'is-invalid': errors.has('selectionText' + item.ProgramControl) }"></textarea>
                  <small v-if="errors.has('selectionText' + item.ProgramControl)" class="help-block text-danger">This field is required</small>
                </div>
                <div v-else>
                  <textarea v-model="formData.extraInfo[group.WebGroupDescription]" class="form-control"></textarea>
                </div>
              </div>
            </div>
            <hr class="lightHr" />
          </div>
        </b-form-radio-group>
        <quill-editor v-bind:editable="model.Editable" v-model="model.WebExecusalRequestPageUpload" settingkey="WebExecusalRequestPageUpload">
        </quill-editor>
        <div>
          <div class="custom-file b-form-file" :class="{ 'is-invalid': errors.has('file') }">
            <input type="file" ref="file" @change="file" placeholder="Choose a file..." accept=".pdf,.tif" v-validate="'file|mimes:application/pdf,image/tiff'" name="file" class="custom-file-input" :class="{ 'is-invalid': errors.has('file') }" />
            <label class="custom-file-label">
              <span v-if="fileselected">
                {{formData.file.name}}
              </span>
              <span v-else>
                Choose a file...
              </span>
            </label>
          </div>
          <div class="mt-2" v-if="fileselected">
            <b-button :variant="'danger'" @click="removefile">
              Clear File Selection
            </b-button>
          </div>
          <small v-if="errors.has('file')" class="help-block text-danger">A file upload is required</small>
        </div>
        <quill-editor v-bind:editable="model.Editable" v-model="model.WebExecusalRequestPageSubmit" settingkey="WebExecusalRequestPageSubmit">
        </quill-editor>
        <div class="text-center mt-4">
          <button :disabled="errors.any() || processing" class="btn btn-primary btn-lg" type="button" v-on:click="validateForm">
            <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
            Submit
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import validationItem from "components/plugins/validationitem.vue";
import excusalRequestService from "services/excusalRequest";
import flatPickr from "vue-flatpickr-component";
import phoneNumber from "awesome-phonenumber";

export default {
  data() {
    return {
      model: {},
      originalModel: {},
      processing: false,
      swear: false,
      fileselected: false,
      formData: {
        poolid: 0,
        jurornumber: 0,
        selected: null,
        selectedControl: "",
        captchaReponse: "",
        dlnumber: "",
        phonenumber: "",
        notifylevel: 0,
        extraInfo: {}
      },
      datepickerconfig: {
        disable: [
          date => {
            if (
              this.model.AllowedDeferredDays &&
              this.model.AllowedDeferredDays.indexOf(date.getDay()) < 0
            )
              return true;

            if ((!this.blackout.find(x => x == date) || []).length > 0)
              return true;

            if (this.model.PostponeStartDate && this.postponestartdate > date)
              return true;

            if (this.model.PostponeEndDate && this.postponeenddate < date)
              return true;
          }
        ],
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d"
      }
    };
  },
  computed: {
    blackout() {
      return this.model.BlackOutDates.map(x => new Date(x));
    },
    postponestartdate() {
      return new Date(this.model.PostponeStartDate);
    },
    postponeenddate() {
      return new Date(this.model.PostponeEndDate);
    }
  },
  watch: {
    "formData.selected"() {
      this.$validator.validate("file");
    }
  },
  methods: {
    removefile() {
      this.fileselected = false;
      this.formData.file = null;
      if (this.$refs.file) this.$refs.file.value = "";
    },
    file() {
      this.fileselected = this.$refs.file.files.length > 0;
      this.formData.file = this.$refs.file.files[0];
    },
    captchaVerify(response) {
      this.formData.captchaReponse = resoponse;
    },
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result && !this.processing) {
          this.processing = true;

          const formdata = new FormData();
          for (const key in this.formData) {
            if (key != "extraInfo" && key != "selected")
              formdata.append(key, this.formData[key]);
          }

          formdata.append("extraInfo", JSON.stringify(this.formData.extraInfo));
          formdata.append(
            "selected",
            this.formData.selected.WebGroupDescription
          );

          excusalRequestService
            .submitExcusalRequest(this, formdata)
            .then(data => {
              if (data.data.indexOf("Success") >= 0) this.clearForm();
              swal(
                "Excusal Request",
                data.data,
                data.data.indexOf("Error") >= 0 ? "error" : "success"
              );
            })
            .finally(() => (this.processing = false));
        }
      });
    },
    clearForm() {
      this.model = Object.assign({}, this.originalModel);
      this.swear = false;
      this.removefile();

      if (this.formData.reset) this.formData.reset();

      this.formData = {
        poolid: 0,
        jurornumber: 0,
        selected: null,
        selectedControl: "",
        captchaReponse: "",
        dlnumber: "",
        phonenumber: "",
        notifylevel: 0,
        extraInfo: {}
      };
    }
  },
  components: {
    flatPickr,
    validationItem
  },
  mounted() {
    const validationErrors = this.$store.state.validationErrors;
    validationErrors.custom.selection = {
      required: "Please make at least one selection"
    };
    this.$validator.localize("en", validationErrors);

    var _this = this;
    this.$validator.extend("phonenumber", value =>
      new phoneNumber(value, "US").isValid()
    );
    this.$validator.extend(
      "file",
      value =>
        value.length > 0 ||
        !_this.formData.selected ||
        !_this.formData.selected.FileRequired
    );
  },
  beforeCreate() {
    excusalRequestService.model(this).then(result => {
      this.originalModel = result.data;
      this.clearForm();
      this.$store.commit("loaded");
    });
  }
};
</script>