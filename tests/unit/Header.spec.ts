import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { Header } from '@/components';
import { ComponentOptions } from 'vue';

const localVue = createLocalVue();
localVue.use(Vuex);

interface State {
  lapItems: {
    program: { rowData: Array<any> }[];
  };
  isRaceStarted: boolean;
  isRaceFinished: boolean;
}

describe('Header', () => {
  let store: Store<State>;
  let state: State;

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

  it('renders correctly with data from the store', () => {
    const wrapper: Wrapper<Vue> = shallowMount(
      Header as ComponentOptions<Vue>,
      {
        localVue,
        store,
      }
    );

    expect(wrapper.find('.horse-header-title').text()).toBe('Horse Racing');
    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons.at(0).text()).toBe('Generate Program');
    expect(buttons.at(1).text()).toBe('Start');
  });

  it("disables 'Generate Program' button when race is started or program exists", () => {
    state.isRaceStarted = true;
    const wrapper: Wrapper<Vue> = shallowMount(
      Header as ComponentOptions<Vue>,
      {
        localVue,
        store,
      }
    );

    const generateButton = wrapper.find('button:first-child');
    expect(generateButton.classes()).toContain('disable');

    state.isRaceStarted = false;
    state.lapItems.program[0].rowData = [{ id: 1, name: 'Horse 1' }];
    const wrapperWithProgram: Wrapper<Vue> = shallowMount(
      Header as ComponentOptions<Vue>,
      {
        localVue,
        store,
      }
    );

    const generateButtonWithProgram =
      wrapperWithProgram.find('button:first-child');
    expect(generateButtonWithProgram.classes()).toContain('disable');
  });
});
