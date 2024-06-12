import Vue from "vue";
import Vuex from "vuex";
import { horseList, distances, horseCountPerLap, lapSize } from "../constants";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    horseList,
    lapItems: {
      program: distances.map((item, index) => {
        return {
          itemName: `${index + 1}. Lap - ${item}M`,
          rowData: [],
          distance: item,
        };
      }),
      results: distances.map((item, index) => {
        return {
          itemName: `${index + 1}. Lap - ${item}M`,
          rowData: [],
        };
      }),
    },
    isRaceStarted: false,
    isRaceFinished: false,
    currentLapIndex: 0,
  },
  mutations: {
    updateLapItem(state, { lapIndex, horses }) {
      state.lapItems.program[lapIndex].rowData = horses;
    },

    pushHorseToResults(state, { horseId, lapIndex }) {
      state.lapItems.results[lapIndex].rowData;
      const horse = state.horseList.find((h) => h.id === horseId);
      state.lapItems.results[lapIndex].rowData.push({
        ...horse,
        position: state.lapItems.results[lapIndex].rowData.length + 1,
      });
      if (state.lapItems.results[lapIndex].rowData.length === horseCountPerLap)
        state.currentLapIndex += 1;
      if (state.currentLapIndex === lapSize) {
        state.isRaceFinished = true;
      }
    },

    setRaceStarted(state, status) {
      state.isRaceStarted = status;
    },
    playAgain(state) {
      state.lapItems.program = state.lapItems.program.map((i) => {
        return {
          ...i,
          rowData: [],
        };
      });
      state.lapItems.results = state.lapItems.results.map((i) => {
        return {
          ...i,
          rowData: [],
        };
      });
      state.isRaceStarted = false;
      state.currentLapIndex = 0;
    },
  },
  actions: {
    async getRandomHorse({ state }, size) {
      const horses = [...state.horseList]
        .sort(() => 0.5 - Math.random())
        .slice(0, size)
        .map((i, index) => {
          return {
            ...i,
            position: index + 1,
            itemSpeed: Math.floor(Math.random() * 5) + 1,
          };
        });
      return horses;
    },
  },
  getters: {
    getHorseList(state) {
      return state.horseList;
    },
  },
});

export default store;
