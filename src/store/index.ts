import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { horseList, distances, horseCountPerLap, lapSize } from "../constants";
import { Horse, State } from "@/types"; 

Vue.use(Vuex);

const state: State = {
  horseList,
  lapItems: {
    program: distances.map((item, index) => ({
      itemName: `${index + 1}. Lap - ${item}M`,
      rowData: [],
      distance: item,
    })),
    results: distances.map((item, index) => ({
      itemName: `${index + 1}. Lap - ${item}M`,
      rowData: [],
    })),
  },
  isRaceStarted: false,
  isRaceFinished: false,
  currentLapIndex: 0,
};

const mutations = {
  updateLapItem(state: State, payload: { lapIndex: number; horses: Horse[] }) {
    state.lapItems!.program[payload.lapIndex].rowData = payload.horses;
  },

  pushHorseToResults(state: State, payload: { horseId: number; lapIndex: number }) {
    const horse = state.horseList.find(h => h.id === payload.horseId);
    if (horse) {
      state.lapItems!.results[payload.lapIndex].rowData.push({
        ...horse,
        position: state.lapItems!.results[payload.lapIndex].rowData.length + 1,
      });

      if (state.lapItems!.results[payload.lapIndex].rowData.length === horseCountPerLap) {
        state.currentLapIndex += 1;
      }

      if (state.currentLapIndex === lapSize) {
        state.isRaceFinished = true;
      }
    }
  },

  setRaceStarted(state: State, status: boolean) {
    state.isRaceStarted = status;
  },

  playAgain(state: State) {
    state.lapItems!.program = state.lapItems!.program.map(i => ({
      ...i,
      rowData: [],
    }));
    state.lapItems!.results = state.lapItems!.results.map(i => ({
      ...i,
      rowData: [],
    }));
    state.isRaceStarted = false;
    state.currentLapIndex = 0;
    state.isRaceFinished = false;
  },
};

const actions = {
  async getRandomHorse({ state }: { state: State }, size: number): Promise<Horse[]> {
    const horses = [...state.horseList]
      .sort(() => 0.5 - Math.random())
      .slice(0, size)
      .map((i, index) => ({
        ...i,
        position: index + 1,
        itemSpeed: Math.floor(Math.random() * 5) + 1,
      }));
    return horses;
  },
};

const getters = {
  getHorseList(state: State): Horse[] {
    return state.horseList;
  },
};

const storeOptions: StoreOptions<State> = {
  state,
  mutations,
  actions,
  getters,
};

const store = new Vuex.Store<State>(storeOptions);

export default store;
