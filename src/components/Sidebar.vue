<template lang="pug">
  #Sidebar
    slot
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style lang="scss" scoped>
#Sidebar {
  flex: 0 240px;
  max-width: 240px;

  box-shadow: inset -1px 0 0 0 #ddd;
}
</style>
