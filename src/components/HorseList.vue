<template>
  <div class="horse-list">
    <div class="horse-list-title">Horse List (1-{{ horseList.length }})</div>

    <Table :columnFields="columnFields" :rowData="horseList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Table } from './index';

@Component({
  components: { Table }
})
export default class HorseList extends Vue {
  columnFields = [
    { key: 'id', title: 'Id', width: '30px' },
    { key: 'name', title: 'Name', width: '150px' },
    { key: 'condition', title: 'Con.', width: '50px' },
    { key: 'color', title: '', width: '15px' },
  ];

  get horseList() {
    return this.$store.state.horseList;
  }
}
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
