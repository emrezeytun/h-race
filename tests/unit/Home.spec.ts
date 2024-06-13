import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { RaceTrack, HorseList, HorseLap, Header } from '@/components';
import Home from '../../src/Home.vue';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(Vuex);

interface ProgramItem {
  rowData: Array<any>;
  itemName: string;
  distance: number;
}

interface State {
  lapItems: {
    program: ProgramItem[];
    results: Array<any>;
  };
}

describe('Home', () => {
  let store: Store<State>;
  let state: State;

  beforeEach(() => {
    state = {
      lapItems: {
        program: [
          { rowData: [], itemName: 'Program 1', distance: 1000 },
          { rowData: [], itemName: 'Program 2', distance: 1200 },
        ],
        results: [],
      },
    };

    store = new Vuex.Store({
      state,
    });
  });

  it('renders correctly with components and data', () => {
    const wrapper: Wrapper<Vue> = shallowMount(Home, {
      localVue,
      store,
    });

    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(HorseList).exists()).toBe(true);
    expect(wrapper.findComponent(RaceTrack).exists()).toBe(false);
    expect(wrapper.findComponent(HorseLap).exists()).toBe(true);
  });

  it("displays 'Generate Program' button when no program data", () => {
    const wrapper: Wrapper<Vue> = shallowMount(Home, {
      localVue,
      store,
    });

    const generateButton = wrapper.find('.horse-racing-horse-race-generate');
    expect(generateButton.exists()).toBe(true);
    expect(generateButton.text()).toBe('Generate Program');
  });

  it('renders RaceTrack component when program data exists', () => {
    state.lapItems.program[0].rowData = [{ id: 1, name: 'Horse 1' }];
    const wrapper: Wrapper<Vue> = shallowMount(Home, {
      localVue,
      store,
    });

    expect(wrapper.findComponent(RaceTrack).exists()).toBe(true);
    expect(wrapper.find('.horse-racing-horse-race-generate').exists()).toBe(
      false
    );
  });
});
