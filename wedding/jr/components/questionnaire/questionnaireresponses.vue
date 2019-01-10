<template>
    <div>
        <div class="text-center">
            <h3>Questionnaire Responses</h3>
        </div>
        <starline></starline>
        <div class="mt-4">
            <div class="row noprint">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="form-control-label">
                            Pool Id
                            <input class="form-control" type="number" placeholder="Pool Id" v-model="poolid" @keyup.enter.native="poolsearch" />
                        </label>
                        <div class="mt-3">
                            <b-button variant="primary" @click="poolsearch" :disabled="processing">
                                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                                Search
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="form-control-label">
                            Panel Id
                            <input class="form-control" type="number" placeholder="Panel Id" v-model="panelid" @keyup.enter.native="panelsearch" />
                        </label>
                        <div class="mt-3">
                            <b-button variant="primary" @click="panelsearch" :disabled="processing">
                                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                                Search
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="form-control-label">
                            Case Number
                            <input class="form-control" type="text" placeholder="Case Number" v-model="casenumber" @keyup.enter.native="casenumbersearch" />
                        </label>
                        <div class="mt-3">
                            <b-button variant="primary" @click="casenumbersearch" :disabled="processing">
                                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                                Search
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="form-control-label">
                            Juror Id
                            <input class="form-control" type="number" placeholder="Juror Id" v-model="jurorid" @keyup.enter.native="jurorsearch" />
                        </label>
                        <div class="mt-3">
                            <b-button variant="primary" @click="jurorsearch" :disabled="processing">
                                <font-awesome-icon icon="circle-notch" size="lg" fixed-width v-if="processing" spin></font-awesome-icon>
                                Search
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="noprint row" v-if="responses.length > 0">
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="form-control-label">
                            <input type="text" class="form-control" placeholder="Question Filter" v-model="filterquestion" />
                        </label>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label class="form-control-label">
                            <input type="text" class="form-control" placeholder="Answer Filter" v-model="filteranswer" />
                        </label>
                    </div>
                </div>
                <div class="col-sm-4"></div>
                <div class="col-sm-2 d-flex align-items-end justify-content-end">
                    <b-button variant="success" @click="showhide">
                        <font-awesome-icon :icon="!collapsed ? 'caret-up' : 'caret-down'" size="lg" fixed-width></font-awesome-icon>
                        {{!collapsed ? "Collapse" : "Uncollapse"}}
                    </b-button>
                </div>
            </div>
            <b-card no-body v-for="(juror, i) in responses" :key="i" v-if="findresponses(juror.Responses)">
                <b-card-header>
                    <b-btn block @click="juror.show = !juror.show" class="darkColor">
                        <h6 class="float-left mt-2">
                            {{juror.Name}}
                        </h6>
                        <font-awesome-icon :icon="juror.show ? 'caret-up' : 'caret-down'" pull="right" size="2x"></font-awesome-icon>
                    </b-btn>
                </b-card-header>
                <b-card-body v-if="juror.show">
                    <div class="mb-2" v-for="(responseGroup, group) in jurorresponses(juror.Responses)" :key="group" v-if="findresponses(responseGroup)">
                        <h5>
                            <font-awesome-icon icon="clock" fixed-width></font-awesome-icon>{{group | moment('MMMM Do YYYY, h:mm a')}}
                        </h5>
                        <div class="ml-3" v-for="(response, j) in responseGroup" :key="j" v-if="findquestion(response.Question) && findanswer(response.Response)">
                            <font-awesome-icon icon="angle-right" fixed-width></font-awesome-icon>{{response.Question}}
                            <b>{{response.Response ? response.Response : '(NO INPUT)'}}</b>
                        </div>
                    </div>
                </b-card-body>
            </b-card>
        </div>
    </div>
</template>
<script>
import questionnaireService from "services/questionnaire";
import moment from "moment";

export default {
  data() {
    return {
      responses: [],
      poolid: "",
      jurorid: "",
      casenumber: "",
      panelid: "",
      processing: false,
      filterquestion: "",
      filteranswer: ""
    };
  },
  computed: {
    collapsed() {
      for (var resp in this.responses)
        if (this.responses[resp].show) return false;

      return true;
    }
  },
  methods: {
    filteritem(item, filter) {
      if (!filter) return true;

      return item.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
    },
    findquestion(question) {
      return this.filteritem(question, this.filterquestion);
    },
    findanswer(answer) {
      return this.filteritem(answer ? answer : "(NO INPUT)", this.filteranswer);
    },
    filteritems(items, filter, filter1, pred, pred1) {
      if (!filter && !filter1) return true;

      var f = filter.toUpperCase();
      var f1 = filter1.toUpperCase();
      return this._.some(
        items,
        x =>
          (!filter ||
            pred(x)
              .toUpperCase()
              .indexOf(f) >= 0) &&
          (!filter1 ||
            pred1(x)
              .toUpperCase()
              .indexOf(f1) >= 0)
      );
    },
    findresponses(responses) {
      return this.filteritems(
        responses,
        this.filterquestion,
        this.filteranswer,
        x => x.Question,
        x => (x.Response ? x.Response : "(NO INPUT)")
      );
    },
    showhide() {
      var collapsed = this.collapsed;
      for (var resp in this.responses) this.responses[resp].show = collapsed;
    },
    jurorresponses(res) {
      return this._.groupBy(this._.orderBy(res, ["Date"], ["desc"]), "Date");
    },
    search(search) {
      this.processing = true;
      questionnaireService
        .responses(this, search)
        .then(result => {
          this.responses = result.data;
        })
        .finally(() => (this.processing = false));
    },
    jurorsearch() {
      this.search({ jurorid: this.jurorid });
    },
    panelsearch() {
      this.search({ panelid: this.panelid });
    },
    casenumbersearch() {
      this.search({ casenumber: this.casenumber });
    },
    poolsearch() {
      this.search({ poolid: this.poolid });
    }
  },
  beforeCreate() {
    this.$store.commit("loaded");
  }
};
</script>