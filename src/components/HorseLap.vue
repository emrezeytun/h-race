<template>
  <div class="horse-lap">
    <div class="horse-lap-title" :style="{ background: lapBackground }">
      {{ lapTitle }}
    </div>

    <div
      v-if="lapItems.length"
      class="horse-lap-tables"
      :class="type === 'results' ? 'result-table-area' : ''"
    >
      <div
        v-for="item in lapItems"
        class="horse-lap-tables-item"
        :key="item.itemName"
      >
        <div v-if="item.rowData.length" class="horse-lap-tables-item-title">
          {{ item.itemName }}
        </div>
        <Table
          v-if="item.rowData.length"
          :columnFields="columnFields"
          :rowData="item.rowData"
        />
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { Table } from './index';
export default {
  name: 'HorseProgram',
  components: { Table },
  data() {
    return {
      columnFields: [
        { key: 'position', title: 'Pos.', width: '40px' },
        { key: 'name', title: 'Name' },
      ],
    };
  },
  props: {
    lapTitle: {
      type: String,
      default: 'Program',
    },
    type: {
      type: String,
      default: 'program',
    },
    lapBackground: {
      type: String,
      default: 'rgb(232, 232, 6)',
    },
    lapItems: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.horse-lap {
  &-tables {
    max-height: 80vh;
    height: 80vh;
    overflow: auto;
    &-item {
      &-title {
        background: rgb(196, 99, 39);
        color: #fff;
        padding: 2px 0;
      }
    }
  }
  &-title {
    color: #000;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
