<template>
    <div>
        <quill-editor v-model="model.Heading" settingkey="WebFAQPageHeading">
        </quill-editor>
        <starline></starline>
        <quill-editor v-model="model.Body" settingkey="WebFAQPageBody">
        </quill-editor>
        <div v-if="$store.getters.editaccess" class="mb-3">
            <div v-if="newitem.add">
                <div class="form-group">
                    <label class="form-control-label">
                        Group
                        <input type="text" v-model="newitem.group" placeholder="Group Name" class="form-control" />
                    </label>
                </div>
                <div class="form-group">
                    <label class="form-control-label">
                        Question
                        <input type="text" v-model="newitem.question" placeholder="Question" class="form-control" />
                    </label>
                </div>
            </div>
            <b-btn :variant="'success'" @click="addnew">{{newitem.add ? 'Save New' : 'Add New'}}</b-btn>
            <b-btn :variant="'danger'" v-if="newitem.add" @click="cancelnew">Cancel</b-btn>
        </div>
        <div v-for="(group, i) in orderGroups(model.Groups)" :key="i">
            <div v-if="$store.getters.editaccess" class="mb-2">
                <input type="text" v-model="group.Name" v-if="group.edit" class="form-control" />
                <b-btn :variant="'info'" @click="editGroup(group)">{{group.edit ? 'Save' : 'Edit'}} Group</b-btn>
                <b-btn :variant="'danger'" v-if="group.edit" @click="cancelGroup(group)">Cancel</b-btn>
            </div>
            <h4 class="mb-2">{{group.Name}}</h4>
            <hr class="lightHr full">
            <b-card no-body v-for="(item, i1) in orderItems(group, group.Items)" :key="i1" class="questionItem">
                <div v-if="$store.getters.editaccess" class="mb-1">
                    <input type="text" v-model="item.Question" v-if="item.edit" class="form-control" />
                    <input type="number" v-model="item.DisplayOrder" v-if="item.edit" class="form-control" />
                    <b-btn :variant="'info'" @click="edit(item, group)">{{item.edit ? 'Save' : 'Edit'}} Question</b-btn>
                    <b-btn :variant="'danger'" v-if="item.edit" @click="cancel(item)">Cancel</b-btn>
                    <b-btn :variant="'danger'" v-if="!item.edit" @click="remove(item, i, i1)">Remove</b-btn>
                </div>
                <b-card-header>
                    <b-btn block @click="item.show = !item.show" class="darkColor">
                        {{item.Question}}
                        <font-awesome-icon :icon="item.show ? 'caret-up' : 'caret-down'" class="questionItemIcon" pull="right" size="2x"></font-awesome-icon>
                    </b-btn>
                </b-card-header>
                <transition name="transition">
                    <b-card-body v-if="item.show">
                        <quill-editor v-model="item.Answer" :lookupid="item.Id">
                        </quill-editor>
                    </b-card-body>
                </transition>
            </b-card>
            <hr class="lightHr full mb-3">
        </div>
    </div>
</template>
<script>
    import faqService from "services/faq";

    export default {
	   data() {
		  return {
			 model: {},
			 newitem: {
				group: '',
				question: '',
				add: false
			 }
		  };
	   },
	   methods: {
		  orderGroups(groups) {
			 return this._.orderBy(groups, ['DisplayOrder'], ['asc']);
		  },
		  orderItems(group, items) {
			 return this._.orderBy(items, ['OriginalDisplayOrder'], ['asc']);
		  },
		  addnew() {
			 if (this.newitem.add) {
				faqService
				    .addFAQQuestion(this, this.newitem)
				    .then(() => {
					   this.cancelnew();
					   this.loadData();
				    });
			 }
			 else
				this.newitem.add = true;
		  },
		  cancelnew() {
			 this.newitem = { group: '', question: '', add: false };
		  },
		  editGroup(group) {
			 if (group.edit) {
				faqService
				    .saveFAQGroup(this, group)
				    .then(() => {
					   group.OriginalName = group.Name;
					   group.edit = false;
				    });
			 }
			 else
				group.edit = true;
		  },
		  edit(item, group) {
			 if (item.edit) {
				faqService
				    .saveFAQQuestion(this, item)
				    .then(() => {
					   item.OriginalQuestion = item.Question;
					   item.OriginalDisplayOrder = item.DisplayOrder;
					   group.DisplayOrder = item.DisplayOrder;
					   item.edit = false;
				    });
			 }
			 else
				item.edit = true;
		  },
		  cancel(item) {
			 item.edit = false;
			 item.Question = item.OriginalQuestion;
			 item.DisplayOrder = item.OriginalDisplayOrder;
		  },
		  cancelGroup(group) {
			 group.edit = false;
			 group.Name = group.OriginalName;
		  },
		  remove(item, i, i1) {
			 faqService
				.removeFAQ(this, item)
				.then(() => {
				    this.model.Groups[i].Items.splice(i1, 1);
				    if (this.model.Groups[i].Items.length == 0)
					   this.model.Groups.splice(i, 1);
				});
		  },
		  loadData() {
			 faqService.model(this).then(result => {
				this.model = result.data;
				this.$store.commit('loaded');
			 });
		  }
	   },
	   created() {
		  this.loadData();
	   }
    };
</script>
<style scoped>
    .questionItem {
    margin-top: 0.1em;
    }

    .questionItemIcon {
    margin-top: -0.2em;
    }

    input[type=number].form-control {
    width: 75px;
    display: initial;
    }
</style>