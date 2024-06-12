import { shallowMount } from "@vue/test-utils";
import { Table } from "@/components";

describe("Table", () => {
  const columnFields = [
    { key: "name", title: "Name" },
    { key: "condition", title: "Condition" },
    { key: "color", title: "Color" },
  ];

  const rowData = [
    { name: "Horse 1", condition: 50, color: "red" },
    { name: "Horse 2", condition: 30, color: "white" },
    { name: "Horse 3", condition: 70, color: "black" },
  ];

  it("renders the table headers correctly", () => {
    const wrapper = shallowMount(Table, {
      propsData: { columnFields, rowData },
    });

    const headers = wrapper.findAll("th");
    expect(headers).toHaveLength(columnFields.length);

    headers.wrappers.forEach((headerWrapper, index) => {
      expect(headerWrapper.text()).toBe(columnFields[index].title);
    });
  });

  it("applies the correct border color", () => {
    const wrapper = shallowMount(Table, {
      propsData: { columnFields, rowData },
    });

    const rows = wrapper.findAll("tbody tr");
    rows.wrappers.forEach((rowWrapper, rowIndex) => {
      const firstCell = rowWrapper.find("td");
      expect(firstCell.attributes("style")).toContain(
        `border-right: 8px solid ${rowData[rowIndex].color}`,
      );
    });
  });
});
