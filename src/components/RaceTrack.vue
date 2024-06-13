<template>
  <div class="race-track">
    <div
      v-for="(program, index) in getPrograms"
      :key="`${program.name}-${currentLapIndex}`"
      class="race-track-item"
      :style="{ width: `${70 + (getLapDistance / 1000) * 9}%` }"
    >
      <div class="race-track-item-number">
        <span> {{ index + 1 }}</span>
      </div>
      <div class="race-track-item-horse">
        <HorseSVG
          :id="program.id"
          :color="program.color"
          :itemSpeed="program.itemSpeed"
          :currentLapIndex="currentLapIndex"
          :condition="program.condition"
        />
      </div>
    </div>
    <div v-if="getPrograms.length" class="race-track-name">
      {{ getLapItemName }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HorseSVG from './common/HorseSVG.vue';
import { distances } from '../constants';

@Component({
  components: { HorseSVG },
})
export default class RaceTrack extends Vue {
  itemSpeed: number = 5;
  newInterval: number | undefined;
  distances: number[] = distances;

  get getPrograms() {
    return this.$store.state.lapItems.program[this.currentLapIndex].rowData;
  }

  get getLapItemName() {
    return this.$store.state.lapItems.program[this.currentLapIndex].itemName;
  }

  get getLapDistance() {
    return this.$store.state.lapItems.program[this.currentLapIndex].distance;
  }

  get currentLapIndex() {
    return this.$store.state.currentLapIndex;
  }

  watchCurrentLapIndex(newValue: number) {
    console.log('newValue:', newValue);
  }

  created() {
    this.$watch('currentLapIndex', this.watchCurrentLapIndex);
  }
}
</script>

<style lang="scss">
.race-track {
  display: flex;
  flex-direction: column;

  &-item {
    width: 95%;
    display: flex;
    border-bottom: 1px dotted #000;
    border-right: 2px solid red;
    &-number {
      width: 50px;
      background: green;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      span {
        transform: rotate(-90deg);
        font-weight: 800;
        font-size: 16px;
      }
    }
    &-horse {
      width: 90%;
      display: flex;
      margin-left: 4px;
    }
  }
  &-name {
    margin-top: 12px;
    color: rgb(142, 31, 31);
    font-weight: 800;
  }
}
</style>
