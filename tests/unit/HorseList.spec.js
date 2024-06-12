import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { Table, HorseList } from "../../src/components";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("HorseList.vue", () => {
  let store;
  let state;

  beforeEach(() => {
    state = {
      horseList: [
        { id: 1, name: "Thunder", condition: "Good", color: "#ff0000" },
        { id: 2, name: "Lightning", condition: "Fair", color: "#00ff00" },
        { id: 3, name: "Storm", condition: "Excellent", color: "#0000ff" },
      ],
    };

    store = new Vuex.Store({
      state,
    });
  });

  it("renders correctly with data from the store", () => {
    const wrapper = shallowMount(HorseList, {
      localVue,
      store,
    });

    expect(wrapper.find(".horse-list-title").text()).toBe("Horse List (1-3)");
    const tableComponent = wrapper.findComponent(Table);
    expect(tableComponent.exists()).toBe(true);
    expect(tableComponent.props("columnFields")).toEqual(wrapper.vm.columnFields);
    expect(tableComponent.props("rowData")).toEqual(state.horseList);
  });

  it("renders the correct number of horses", () => {
    const wrapper = shallowMount(HorseList, {
      localVue,
      store,
    });

    const tableComponent = wrapper.findComponent(Table);
    expect(tableComponent.props("rowData")).toHaveLength(3);
  });

  it("renders the table with the correct column fields", () => {
    const wrapper = shallowMount(HorseList, {
      localVue,
      store,
    });

    const expectedColumnFields = [
      { key: "id", title: "Id", width: "30px" },
      { key: "name", title: "Name", width: "150px" },
      { key: "condition", title: "Con.", width: "50px" },
      { key: "color", title: "", width: "15px" },
    ];

    const tableComponent = wrapper.findComponent(Table);
    expect(tableComponent.props("columnFields")).toEqual(expectedColumnFields);
  });
});
