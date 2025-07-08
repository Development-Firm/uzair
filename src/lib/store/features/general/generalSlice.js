import { createAppSlice } from '../../createAppSlice';

// Initial state
const initialState = {
  sceneHeight: '73vh',
  menueCollapsed: false,
  zoom: 0,
  mode: 'black',
  isDefaultMode: true,
  selectedModel: 'flat-box',
  canvas2dDimensions: { width: 0, height: 0 },
  openCustomizationDrawer: false,
  selectedLogo: null, // Initial selected logo is null
  logos: [], // Initial logos array is empty
  updateModelAt: Date.now(),
};

// Slice
export const generalSlice = createAppSlice({
  name: 'general',
  initialState,
  reducers: {
    setSceneHeight: (state, action) => {
      state.sceneHeight = action.payload;
    },
    toggleMenuCollapse: (state) => {
      state.menueCollapsed = !state.menueCollapsed;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setIsDefaultMode: (state, action) => {
      state.isDefaultMode = action.payload;
    },
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
    },
    setCanvas2dDimensions: (state, action) => {
      state.canvas2dDimensions = action.payload;
    },
    setOpenCustomizationDrawer: (state, action) => {
      state.openCustomizationDrawer = action.payload;
    },
    setSelectedLogo: (state, action) => {
      state.selectedLogo = action.payload;
    },
    setLogos: (state, action) => {
      state.logos = action.payload;
    },
    setUpdatedModelAt: (state, action) => {
      state.updateModelAt = action.payload;
    },
  },
  selectors: {
    selectSceneHeight: (state) => state.sceneHeight,
    selectMenueCollapsedState: (state) => state.menueCollapsed,
    selectZoom: (state) => state.zoom,
    selectMode: (state) => state.mode,
    selectIsDefaultMode: (state) => state.isDefaultMode,
    selectSelectedModel: (state) => state.selectedModel,
    selectCanvas2dDimensions: (state) => state.canvas2dDimensions,
    selectOpenCustomizationDrawer: (state) => state.openCustomizationDrawer,
    selectSelectedLogo: (state) => state.selectedLogo, // Selector for selected logo
    selectLogos: (state) => state.logos, // Selector for logos array
    selectUpdatedModelAt: (state) => state.updateModelAt,
  },
});

// Export actions
export const {
  setSceneHeight,
  toggleMenuCollapse,
  setZoom,
  setMode,
  setIsDefaultMode,
  setSelectedModel,
  setCanvas2dDimensions,
  setOpenCustomizationDrawer,
  setSelectedLogo, // Export setSelectedLogo action
  setLogos, // Export setLogos action
  setUpdatedModelAt,
} = generalSlice.actions;

// Export selectors
export const {
  selectSceneHeight,
  selectMenueCollapsedState,
  selectZoom,
  selectMode,
  selectIsDefaultMode,
  selectSelectedModel,
  selectCanvas2dDimensions,
  selectOpenCustomizationDrawer,
  selectSelectedLogo, // Export selector for selected logo
  selectLogos, // Export selector for logos array
  selectUpdatedModelAt,
} = generalSlice.selectors;
