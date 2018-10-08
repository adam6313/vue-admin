<template lang="pug">
  #Login
    Card
      p(slot="title") {{ $t('Login') }}
      FormTool(:Instance="Instance" Button="登入" :Btn_long="true" @handleResult="Login" :inline="true")
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      Instance: {
        account: {
          label: this.$t("Acc"),
          placeholder: this.$t("enterAcc"),
          required: true,
          value: ""
        },
        password: {
          label: this.$t("Pwd"),
          placeholder: this.$t("enterPwd"),
          required: true,
          value: ""
        }
      }
    };
  },
  methods: {
    Login(res) {
      this.$api.Login(res);
      this.$router.push("/Group1-Item1");
    }
  }
};
</script>

<style lang="scss" scoped>
#Login {
  @include Flex;
  @include size;
  background-color: #eee;
  .ivu-card {
    @include size(500px, auto);
    box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
  }
}
</style>
