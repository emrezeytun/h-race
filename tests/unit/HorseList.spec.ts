import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { Table, HorseList } from '@/components';
import Vue from 'vue';
import { State } from '@/types';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HorseList', () => {
  let store: Store<State>;
  let state: State;

  beforeEach(() => {
    state = {
      horseList: [
        { id: 1, name: 'Thunder', condition: 25, color: '#ff0000' },
        { id: 2, name: 'Lightning', condition: 30, color: '#00ff00' },
        { id: 3, name: 'Storm', condition: 55, color: '#0000ff' },
      ],
      lapItems: {
        program: [],
        results: [],
      },
      isRaceStarted: false,
      isRaceFinished: false,
      currentLapIndex: 0,
    };

    store = new Vuex.Store({
      state,
      mutations: {},
      actions: {},
      getters: {},
    });
  });

  it('renders correctly with data from the store', () => {
    const wrapper: Wrapper<Vue> = shallowMount(HorseList, {
      localVue,
      store,
    });

    expect(wrapper.find('.horse-list-title').text()).toBe('Horse List (1-3)');
    const tableComponent = wrapper.findComponent(Table);
    expect(tableComponent.exists()).toBe(true);
    expect(tableComponent.props('columnFields')).toEqual(
      (wrapper.vm as any).columnFields
    );
    expect(tableComponent.props('rowData')).toEqual(state.horseList);
  });

  it('renders the correct number of horses', () => {
    const wrapper: Wrapper<Vue> = shallowMount(HorseList, {
      localVue,
      store,
    });

    const tableComponent = wrapper.findComponent(Table);
    expect(tableComponent.props('rowData')).toHaveLength(3);
  });

  it('renders the table with the correct column fields', () => {
    const wrapper: Wrapper<Vue> = shallowMount(HorseList, {
      localVue,
      store,
    });

    const expectedColumnFields = [
      { key: 'id', title: 'Id', width: '30px' },
      { key: 'name', title: 'Name', width: '150px' },
      { key: 'condition', title: 'Con.', width: '50px' },
      { key: 'color', title: '', width: '15px' },
    ];

    const tableComponent = wrapper.findComponent(Table);
    expect(tableComponent.props('columnFields')).toEqual(expectedColumnFields);
  });
});
