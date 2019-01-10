<template>
	<div>
		<div v-if="iseditable" v-tooltip="{ content: settingkey ? settingkey : 'Edit',  classes: [ 'editor'] }">
			<div ref="main" class="quill-editor" v-show="editor">
				<slot name="toolbar"></slot>
				<div ref="editor"></div>
			</div>
			<div v-show="!editor" v-bind:class="{ editable: iseditable }" class="editordisplay ql-snow ql-container">
				<div class="ql-editor" v-on:click="edit" v-html="value">
				</div>
			</div>
		</div>
		<div class="ql-snow" v-if="!iseditable && value">
			<div class="ql-editor not-ql-editor" v-html="value">
			</div>
		</div>
	</div>
</template>
<script>
import Quill from "quill";
import homeService from "services/home";
import "quill/dist/quill.snow.css";
import "assets/plugins/quill.scss";
import { dom } from "@fortawesome/fontawesome-svg-core";

const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "timesnewroman",
  "couriernew",
  "verdana",
  "georgia",
  "palatino",
  "garamond",
  "bookman",
  "comicsans",
  "trebuchet",
  "impact",
  "lato",
  "opensans",
  "josefinslab",
  "arvo",
  "vollkorn",
  "abrilfatface",
  "ubuntu",
  "ptsans",
  "oldstandard",
  "monospace"
];
Quill.register(Font, true);

export default {
  data: function data() {
    return {
      initialized: false,
      editor: false,
      ops: {},
      con: "",
      defaultOptions: {
        theme: "snow",
        boundary: document.body,
        debug: "error",
        modules: {
          toolbar: [
            [{ header: [] }, { size: [] }],
            ["bold", "italic", "underline"],
            [{ font: Font.whitelist }],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            [{ color: [] }, { background: [] }],
            ["link", "image", "video"],
            ["clean"],
            [["source"], ["save"], ["close"]]
          ]
        },
        placeholder: "Insert text here ...",
        readOnly: false
      }
    };
  },
  computed: {
    iseditable() {
      return this.$store.getters.editaccess && !this.$store.state.printing;
    }
  },
  props: {
    content: String,
    value: String,
    editable: Boolean,
    disabled: Boolean,
    settingkey: String,
    lookupid: Number,
    options: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  mounted() {
    this.initialize();
  },
  beforeDestroy() {
    delete this.quill;
  },
  methods: {
    edit: function edit() {
      this.editor = true;
    },
    // Init Quill instance
    initialize: function initialize() {
      const _this = this;

      if (this.$el && this.$refs.editor) {
        // Options
        this.ops = $.extend(
          {},
          this.defaultOptions,
          this.globalOptions,
          this.options
        );
        // Instance
        this.quill = new Quill(this.$refs.editor, this.ops);
        // Set editor content
        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content);
        }
        // Disabled editor
        if (this.disabled) {
          this.quill.enable(false);
        }
        // Mark model as touched if editor lost focus
        this.quill.on("selection-change", function(range) {
          if (!range) {
            _this.$emit("blur", _this.quill);
          } else {
            _this.$emit("focus", _this.quill);
          }
        });
        // Update model if text changes
        this.quill.on("text-change", function(delta, oldDelta, source) {
          let html = _this.$refs.editor.children[0].innerHTML;
          const quill = _this.quill;
          const text = _this.quill.getText();
          if (html === "<p><br></p>") html = "";
          _this.txtArea.value = html;
          _this.con = html;
          _this.$emit("input", _this.con);
          _this.$emit("change", { html: html, text: text, quill: quill });
        });

        const closebutton = $(this.$refs.main).find('button[value="close"]');
        const savebutton = $(this.$refs.main).find('button[value="save"]');
        const sourcebutton = $(this.$refs.main).find('button[value="source"]');
        savebutton
          .add(closebutton)
          .add(sourcebutton)
          .addClass("editorsavebutton");

        savebutton.append(
          '<i class="fas fa-save fa-fw" style="margin-top: 3px;"></i><span style="font-size: 14px">Save</span>'
        );
        closebutton.append(
          '<i class="fas fa-times fa-fw" style="margin-top: 3px;"></i><span style="font-size: 14px">Close</span>'
        );
        sourcebutton.append(
          '<i class="fab fa-html5 fa-fw" style="margin-top: 3px;"></i><span style="font-size: 14px">HTML</span>'
        );

        dom.i2svg();

        this.txtArea = document.createElement("textarea");
        this.txtArea.value = _this.$refs.editor.children[0].innerHTML;
        this.txtArea.style.cssText =
          "width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none";

        let htmlEditor = this.quill.addContainer("ql-custom");
        htmlEditor.appendChild(this.txtArea);

        sourcebutton.click(() => {
          if (_this.txtArea.style.display === "") {
            const html = _this.txtArea.value;
            _this.quill.pasteHTML(html);
          }
          _this.txtArea.style.display =
            _this.txtArea.style.display === "none" ? "" : "none";
        });

        savebutton.click(function() {
          if (!_this.lookupid)
            homeService
              .saveSetting(_this, {
                SettingKey: _this.settingkey,
                SettingValue: _this.value
              })
              .then(function() {
                _this.editor = false;
              });
          else
            homeService
              .saveFAQLookupValue(_this, {
                Id: _this.lookupid,
                StringValue: _this.value
              })
              .then(function() {
                _this.editor = false;
              });
        });

        closebutton.click(function() {
          _this.editor = false;
        });

        // Emit ready event
        this.$emit("ready", this.quill);
      }
    }
  },
  watch: {
    iseditable(value) {
      if (value)
        this.$nextTick(() => {
          this.initialize();
        });
      else delete this.quill;
    },
    // Watch content change
    content: function content(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.con) {
          this.con = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },

    // Watch content change
    value: function value(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.con) {
          this.con = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },

    // Watch disabled change
    disabled: function disabled(newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal);
      }
    }
  }
};
</script>