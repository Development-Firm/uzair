import { createAppSlice } from "../../createAppSlice";

// Initial state definition with default values
const initialState = {
  currentDataVisualization: "bar-chart",
};

// Creating the slice using the initialState and reducers
export const dataVisualizationSlice = createAppSlice({
  name: "data-visualization",
  initialState,
  reducers: {
    setCurrentDataVisualization: (state, action) => {
      state.currentDataVisualization = action.payload;
    },
  },
  selectors: {
    selectCurrentDataVisualization: (visualization) =>
      visualization.currentDataVisualization,
  },
});

// Exporting action creators
export const {setCurrentDataVisualization} = dataVisualizationSlice.actions;

// Exporting selectors
export const { selectCurrentDataVisualization } = dataVisualizationSlice.selectors;
