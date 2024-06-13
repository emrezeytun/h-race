<template>
  <div class="horse-list">
    <div class="horse-list-title">Horse List (1-{{ horseList.length }})</div>

    <Table :columnFields="columnFields" :rowData="horseList" />
  </div>
</template>

<script>
import { Table } from './index';

export default {
  name: 'HorseList',
  components: { Table },
  data() {
    return {
      columnFields: [
        { key: 'id', title: 'Id', width: '30px' },
        { key: 'name', title: 'Name', width: '150px' },
        { key: 'condition', title: 'Con.', width: '50px' },
        { key: 'color', title: '', width: '15px' },
      ],
    };
  },
  created() {
    console.log('this.$store.state.horseList', this.$store.state.horseList);
  },
  computed: {
    horseList() {
      return this.$store.state.horseList;
    },
  },
};
</script>

<style lang="scss">
.horse-list {
  &-title {
    background: rgb(232, 232, 6);
    color: #000;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
