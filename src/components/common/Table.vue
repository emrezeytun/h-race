<template>
  <div class="horse-racing-table">
    <table>
      <thead>
        <tr>
          <th
            :style="{
              width: column.width ? column.width : '100%',
            }"
            v-for="column in columnFields"
            :key="column.key"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="data in rowData" :key="data.name">
          <td
            :style="{
              ...(index === 0 && data.color
                ? { borderRight: `8px solid ${data.color}` }
                : {}),
              ...(column.key === 'color' && data.color
                ? { backgroundColor: `${data.color}` }
                : {}),
            }"
            v-for="(column, index) in columnFields"
            :key="column.key"
          >
            {{ column.key === 'color' ? '' : data[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {ColumnField, RowData} from '@/types'


@Component
export default class TableComponent extends Vue {
  @Prop({ type: Array, default: () => [] }) columnFields!: ColumnField[];
  @Prop({ type: Array, default: () => [] }) rowData!: RowData[];
}
</script>

<style lang="scss">
.horse-racing-table {
  table {
    border: 1px solid #dededf;
    height: 100%;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 1px;
    text-align: left;
    th {
      border: 1px solid #dededf;
      background-color: #bdc9d0;
      color: #404040;
      padding: 5px;
    }
    td {
      border: 1px solid #dededf;
      background-color: #fafafa;
      color: #181616;
      padding: 5px;
    }
  }
}
</style>
