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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Table } from './index';
import {ColumnField, LapItem} from '@/types'


@Component({
  components: { Table },
})
export default class HorseProgram extends Vue {
  columnFields: ColumnField[] = [
    { key: 'position', title: 'Pos.', width: '40px' },
    { key: 'name', title: 'Name' },
  ];

  @Prop({ type: String, default: 'Program' }) lapTitle!: string;
  @Prop({ type: String, default: 'program' }) type!: string;
  @Prop({ type: String, default: 'rgb(232, 232, 6)' }) lapBackground!: string;
  @Prop({ type: Array, default: () => [] }) lapItems!: LapItem[];
}
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
