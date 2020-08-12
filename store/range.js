const rangeStore = {
  state: {
    rangeMin: "0",
    rangeMax: "10"
  },
  mutations: {
    setMinRange(state, data) {
      state.rangeMin = data;
    },
    setMaxRange(state, data) {
      state.rangeMax = data;
    }
  },
  actions: {
    set_min_range(vuexContext, min_range) {
      vuexContext.commit("setMinRange", min_range);
    },
    set_max_range(vuexContext, max_range) {
      vuexContext.commit("setMaxRange", max_range);
    }
  },
  getters: {
    range_min(state) {
      return state.rangeMin;
    },
    range_max(state) {
      return state.rangeMax;
    }
  }
};

export default rangeStore;
