import { createAppSlice } from "../../createAppSlice";

const initialState = {
  tableSize: "medium",
  tableShieldColor: "",
  tableDesignMap: {
    shield: {
      color: "",
    },
    legs: {
      color: "",
    },
    base: {
      color: "",
    },
    shieldSupport: {
      color: "",
    },
    centralSupport: {
      color: "",
    },
  },
  currentLayer: "shield",
};

export const tableSlice = createAppSlice({
  name: "table",
  initialState,
  reducers: {
    setTableSize: (state, action) => {
      state.tableSize = action.payload;
    },
    setTableShieldColor: (state, action) => {
      state.tableShieldColor = action.payload;
    },
    setTableDesignMap: (state, action) => {
      state.tableDesignMap = action.payload;
    },
    setCurrentLayer: (state, action) => {
      state.currentLayer = action.payload;
    },
  },
  selectors: {
    selectTableSize: (table) => table.tableSize,
    selectTableShieldColor: (table) => table.tableShieldColor,
    selectTableDesignMap: (table) => table.tableDesignMap,
    selectCurrentLayer: (table) => table.currentLayer,
  },
});

// Export actions
export const {
  setTableSize,
  setTableShieldColor,
  setTableDesignMap,
  setCurrentLayer,
} = tableSlice.actions;

// Export selectors
export const {
  selectTableSize,
  selectTableShieldColor,
  selectTableDesignMap,
  selectCurrentLayer,
} = tableSlice.selectors;

// Default export
export default tableSlice;
