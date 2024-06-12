import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import {RaceTrack, HorseSVG} from "@/components";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("RaceTrack", () => {
  let store;
  let state;

  beforeEach(() => {
    state = {
      lapItems: {
        program: [
          {
            rowData: [
              { id: 1, name: "Thunder", color: "#ff0000", itemSpeed: 10 },
              { id: 2, name: "Lightning", color: "#00ff00", itemSpeed: 12 },
              { id: 3, name: "Storm", color: "#0000ff", itemSpeed: 14 },
            ],
            itemName: "First Lap",
            distance: 1000,
          },
        ],
      },
      currentLapIndex: 0,
    };

    store = new Vuex.Store({
      state,
    });
  });

  it("renders correctly with data from the store", () => {
    const wrapper = shallowMount(RaceTrack, {
      localVue,
      store,
    });

    const raceTrackItems = wrapper.findAll(".race-track-item");
    expect(raceTrackItems).toHaveLength(state.lapItems.program[0].rowData.length);

    raceTrackItems.wrappers.forEach((item, index) => {
      const horseSVG = item.findComponent(HorseSVG);
      expect(horseSVG.exists()).toBe(true);
      expect(horseSVG.props("id")).toBe(state.lapItems.program[0].rowData[index].id);
      expect(horseSVG.props("color")).toBe(state.lapItems.program[0].rowData[index].color);
      expect(horseSVG.props("itemSpeed")).toBe(state.lapItems.program[0].rowData[index].itemSpeed);
      expect(horseSVG.props("currentLapIndex")).toBe(state.currentLapIndex);
    });
  });

  it("renders the correct lap item name", () => {
    const wrapper = shallowMount(RaceTrack, {
      localVue,
      store,
    });

    const lapItemName = wrapper.find(".race-track-name");
    expect(lapItemName.exists()).toBe(true);
    expect(lapItemName.text()).toBe(state.lapItems.program[state.currentLapIndex].itemName);
  });

});
