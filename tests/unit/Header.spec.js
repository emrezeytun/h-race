import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import {Header} from "@/components";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Header", () => {
  let store;
  let state;
  beforeEach(() => {
    state = {
      lapItems: {
        program: [{ rowData: [] }],
      },
      isRaceStarted: false,
      isRaceFinished: false,
    };

  
    store = new Vuex.Store({
      state,
    });
  });

  it("renders correctly with data from the store", () => {
    const wrapper = shallowMount(Header, {
      localVue,
      store,
    });

    expect(wrapper.find(".horse-header-title").text()).toBe("Horse Racing");
    const buttons = wrapper.findAll("button");
    expect(buttons).toHaveLength(2);
    expect(buttons.at(0).text()).toBe("Generate Program");
    expect(buttons.at(1).text()).toBe("Start");
  });

  it("disables 'Generate Program' button when race is started or program exists", () => {
    state.isRaceStarted = true;
    const wrapper = shallowMount(Header, {
      localVue,
      store,
    });

    const generateButton = wrapper.find("button:first-child");
    expect(generateButton.classes()).toContain("disable");

    state.isRaceStarted = false;
    state.lapItems.program[0].rowData = [{ id: 1, name: "Horse 1" }];
    const wrapperWithProgram = shallowMount(Header, {
      localVue,
      store,
    });

    const generateButtonWithProgram = wrapperWithProgram.find("button:first-child");
    expect(generateButtonWithProgram.classes()).toContain("disable");
  });


});
