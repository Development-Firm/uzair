import { createAppSlice } from "../../createAppSlice";

const initialState = {
  sofaType: "sofa-one",
  currentSofaColor: "",
  sofaDesignMap: {
    cushion: {
      color: "",
    },
    sofa: {
      color: "",
    },
    legs: {
      color: "",
    }
  },
  currentSofaLayer: "sofa",
};

export const sofaSlice = createAppSlice({
  name: "sofa",
  initialState,
  reducers: {
    setSofaType: (state, action) => {
      state.sofaType = action.payload;
    },
    setCurrentSofaColor: (state, action) => {
      state.currentSofaColor = action.payload; // Corrected the property name
    },
    setSofaDesignMap: (state, action) => {
      state.sofaDesignMap = action.payload;
    },
    setCurrentSofaLayer: (state, action) => {
      state.currentSofaLayer = action.payload;
    },
  },
  selectors: {
    selectSofaType: (sofa) => sofa.sofaType,
    selectCurrentSofaColor: (sofa) => sofa.currentSofaColor, // Corrected the property name
    selectSofaDesignMap: (sofa) => sofa.sofaDesignMap,
    selectCurrentSofaLayer: (sofa) => sofa.currentSofaLayer,
  },
});

// Export actions
export const {
  setSofaType,
  setCurrentSofaColor, // Corrected the action name
  setSofaDesignMap,
  setCurrentSofaLayer,
} = sofaSlice.actions;

// Export selectors
export const {
  selectSofaType,
  selectCurrentSofaColor, // Corrected the selector name
  selectSofaDesignMap,
  selectCurrentSofaLayer,
} = sofaSlice.selectors; // Corrected the property access

// Default export
export default sofaSlice;
