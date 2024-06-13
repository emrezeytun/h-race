<template>
  <div class="horse-header">
    <div class="horse-header-title">Horse Racing</div>
    <div class="horse-header-actions">
      <button
        @click="updateLapData"
        class="horse-header-actions-item"
        :class="isRaceStarted || getPrograms.length ? 'disable' : ''"
      >
        Generate Program
      </button>

      <button
        @click="
          isRaceFinished ? playAgain() : startRace(isRaceStarted ? false : true)
        "
        class="horse-header-actions-item"
        :class="getPrograms.length ? '' : 'disable'"
      >
        {{ isRaceFinished ? 'Play Again' : isRaceStarted ? 'Pause' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { lapSize } from '../constants';

export default {
  name: 'HorseHeader',
  components: {},
  data() {
    return {
      lapSize,
    };
  },
  computed: {
    getPrograms() {
      return this.$store.state.lapItems.program[0].rowData;
    },
    isRaceStarted() {
      return this.$store.state.isRaceStarted;
    },
    isRaceFinished() {
      return this.$store.state.isRaceFinished;
    },
  },
  methods: {
    updateLapData() {
      for (let i = 0; i < this.lapSize; i++) {
        store.dispatch('getRandomHorse', 10).then((randomHorses) => {
          store.commit('updateLapItem', {
            lapIndex: i,
            horses: randomHorses,
          });
        });
      }
    },
    playAgain() {
      store.commit('playAgain');
    },
    startRace(status) {
      store.commit('setRaceStarted', status);
    },
  },
};
</script>

<style lang="scss" scoped>
.horse-header {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #8e1782;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  &-title {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
  }
  &-actions {
    display: flex;
    &-item {
      background: #fff;
      padding: 10px;
      display: flex;
      border: none;
      justify-content: center;
      cursor: pointer;
      margin-left: 12px;
      border-radius: 12px;
      transition: 0.5s;
      min-width: 80px !important;
      &.disable {
        pointer-events: none;
        opacity: 0.4;
        cursor: no-drop;
        &:hover {
          opacity: 0.4;
        }
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
