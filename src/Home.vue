<template>
  <div class="horse">
    <div class="horse-header">
      <Header />
    </div>
    <div class="horse-racing">
      <div class="horse-racing-horse-list">
        <HorseList />
      </div>

      <div class="horse-racing-horse-race">
        <RaceTrack v-if="horseProgramList[0].rowData.length" />
        <div
          @click="updateLapData"
          v-else
          class="horse-racing-horse-race-generate"
        >
          Generate Program
        </div>
      </div>

      <div class="horse-racing-horse-program">
        <HorseLap
          type="program"
          lapTitle="Program"
          lapBackground="rgb(232, 232, 6)"
          :lapItems="horseProgramList"
        />
      </div>
      <div class="horse-racing-horse-result">
        <HorseLap
          type="results"
          lapTitle="Results"
          lapBackground="rgb(30,144,255)"
          :lapItems="horseResultsList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { HorseList, HorseLap, RaceTrack, Header } from "./components";
import store from "@/store";
import { lapSize } from "./constants";

export default {
  name: "App",
  components: { HorseList, HorseLap, RaceTrack, Header },
  data() {
    return {
      lapSize,
    };
  },
  computed: {
    horseProgramList() {
      return this.$store.state.lapItems.program;
    },
    horseResultsList() {
      return this.$store.state.lapItems.results;
    },
  },
  methods: {
    updateLapData() {
      for (let i = 0; i < this.lapSize; i++) {
        store.dispatch("getRandomHorse", 10).then((randomHorses) => {
          store.commit("updateLapItem", {
            lapIndex: i,
            horses: randomHorses,
          });
        });
      }
    },
  },
};
</script>

<style lang="scss">
.horse-racing {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 12px;
  display: flex;
  gap: 2px;
  &-horse {
    &-list {
      width: 20vw;
    }
    &-race {
      width: 50vw;

      &-generate {
        display: flex;
        justify-content: center;
        cursor: pointer;
        background: purple;
        height: max-content;
        color: #fff;
        padding: 12px;
        font-size: 16px;
        border-radius: 12px;
        margin: 0 12px;
        font-weight: 800;
        transition: 0.5s;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    &-program {
      width: 15vw;
    }
    &-result {
      width: 15vw;
    }
  }
}
</style>
