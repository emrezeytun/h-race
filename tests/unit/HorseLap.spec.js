import { shallowMount } from "@vue/test-utils";
import {HorseLap, Table} from "@/components";

describe("HorseLap", () => {
  const lapItems = [
    {
      itemName: "Program 1",
      rowData: [
        { position: 1, name: "Horse 1" },
        { position: 2, name: "Horse 2" },
      ],
    },
    {
      itemName: "Program 2",
      rowData: [
        { position: 1, name: "Horse 3" },
        { position: 2, name: "Horse 4" },
      ],
    },
  ];

  it("renders correctly with props", () => {
    const wrapper = shallowMount(HorseLap, {
      propsData: {
        lapTitle: "Test Program",
        type: "program",
        lapBackground: "rgb(200, 200, 200)",
        lapItems,
      },
    });

    expect(wrapper.find(".horse-lap-title").text()).toBe("Test Program");
    expect(wrapper.find(".horse-lap-title").attributes("style")).toContain("background: rgb(200, 200, 200);");
  });

  it("renders the correct number of lap items", () => {
    const wrapper = shallowMount(HorseLap, {
      propsData: {
        lapItems,
      },
    });

    const lapTables = wrapper.findAll(".horse-lap-tables-item");
    expect(lapTables).toHaveLength(lapItems.length);
  });


  it("does not render Table component when rowData is empty", () => {
    const emptyLapItems = [
      {
        itemName: "Empty Program",
        rowData: [],
      },
    ];

    const wrapper = shallowMount(HorseLap, {
      propsData: {
        lapItems: emptyLapItems,
      },
    });

    expect(wrapper.findComponent(Table).exists()).toBe(false);
  });
});
