<template lang="pug">
  Form#FormTool(:label-position="LabelPosition"
                :inline="inline"
                ref="reference"
                :rules="ruleValidate"
                :model="model"
                @submit.native.prevent="Submit")
    FormItem(v-for="(Item, key) in Instance" :prop="key" :label="Item.label")
      Input(:placeholder="Item.placeholder" :disabled="Item.disable" v-model="model[key]" :type="Item.type")
    FormItem(v-if="Button")
      Button(type="primary" html-type="submit" :loading="loading" :long="Btn_long") {{ Button }}
</template>

<script>
export default {
  name: "FormTool",
  props: {
    Instance: {
      type: Object,
      default: () => {}
    },
    Button: {
      type: String,
      default: () => ""
    },
    LabelPosition: {
      type: String,
      default: () => "top" // left、top
    },
    inline: {
      type: Boolean,
      default: () => false
    },
    Btn_long: {
      type: Boolean,
      default: () => false
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      model: {},
      GetInstanceKeys: this.Instance ? Object.keys(this.Instance) : []
    };
  },
  computed: {
    ruleValidate() {
      return this.GetInstanceKeys.reduce((pre, current) => {
        pre[current] = [
          {
            required: this.Instance[current].required,
            trigger: "change",
            message: " "
          }
        ];
        return pre;
      }, {});
    }
  },
  created() {
    if (!this.GetInstanceKeys) {
      return;
    }
    this.GetInstanceKeys.forEach(item =>
      this.$set(this.model, item, `${this.Instance[item].value}` || "")
    );
  },
  methods: {
    async Submit() {
      const validate = await this.$refs.reference.validate(valid => valid);
      if (!validate) {
        return;
      }
      this.$emit("handleResult", this.model);
    }
  }
};
</script>
