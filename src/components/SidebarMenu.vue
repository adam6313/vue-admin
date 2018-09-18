<template lang="pug">
  #SidebarMenu
    i-menu(theme="light" :open-names="['1']" accordion)
      Submenu(:name="key + 1" :key="key" v-for="(items, key) in Data")
        template(slot="title")
          span {{ key }}
        MenuItem(:name="item.name" :key="index" v-for="(item, index) in items") {{ item.name }}
</template>

<script>
import { register_router } from '@/register';
import { isArray } from '@/utils';

export default {
  name: 'SidebarMenu',
  data() {
    return {
      Data: {},
    };
  },
  mounted() {
    register_router.forEach(({ name }) => {
      const [Group, item] = name.split('-');
      if (!isArray(this.Data[Group])) {
        this.$set(this.Data, Group, []);
      }
      this.Data[Group].push({
        name: item,
        path: item,
      });
    })
  },
};

</script>
