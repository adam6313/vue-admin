<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
html {
  font-size: 16px;

  @include size;
  @extend %init;
  body {
    font-size: 1rem;

    @include size;
    #app {
      @extend body;
    }
  }
}
</style>
