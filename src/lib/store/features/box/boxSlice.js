import { createAppSlice } from '../../createAppSlice';

// Initial state definition with default values
const initialState = {
  pattern: 'none',
  color: '',
  coating: 'none',
  gradient: [],
  customFaces: {}, // Faces on which custom logo has been applied (e.g., outside_back, outside_bottom)
  currentBoxFace: 'none',
  colorType: 'flat', // flat || gradient
  dimensions: {
    length: '',
    breadth: '',
    height: '',
    unit: 'mm'
  },
  boxLogos: [
    {
      id: '',
      name: '',
      url: '',
    }
  ],
  currentBoxLogo: {
    id: '',
    name: '',
    url: '',
  }
};

// Creating the slice using the initialState and reducers
export const boxSlice = createAppSlice({
  name: 'flat-box',
  initialState,
  reducers: {
    setBoxPattern: (state, action) => {
      state.pattern = action.payload;
    },
    setBoxColor: (state, action) => {
      state.color = action.payload;
      state.colorType = 'flat';
    },
    setBoxGradient: (state, action) => {
      state.gradient = action.payload;
      state.colorType = 'gradient';
    },
    setBoxCoating: (state, action) => {
      state.coating = action.payload;
    },
    setCurrentBoxFace: (state, action) => {
      state.currentBoxFace = action.payload;
    },
    setBoxDimensions: (state, action) => {
      state.dimensions = action.payload;
    },
    setBoxLogos: (state, action) => {
      state.boxLogos = action.payload;
    },
    setCurrentBoxLogo: (state, action) => {
      state.currentBoxLogo = action.payload;
    },
    setCustomFacesForBox: (state, action) => {
      const obj = { ...state.customFaces };
      obj[action.payload.boxFace] = {
        texture: action.payload.value,
        canvasTexture: action.payload.canvasTexture,
        dimensions: action.payload.dimensions,
      };
      state.customFaces = obj;
    },
    updateCustomFacesOfBox: (state, action) => {
      if (action.payload.color && state.customFaces) {
        const obj = { ...state.customFaces };
        Object.keys(obj).forEach(face => {
          obj[face].canvasTexture.backgroundImage = undefined;
          obj[face].canvasTexture.background = action.payload.color;
        });
        state.customFaces = obj;
      } else {
        if (state.customFaces) {
          const obj = { ...state.customFaces };
          Object.keys(obj).forEach(face => {
            obj[face].canvasTexture.background = undefined;
            const backgroundImage = {
              type: 'image',
              version: '5.3.0',
              originX: 'left',
              originY: 'top',
              left: 0,
              top: 0,
              width: 3000,
              height: 2000,
              scaleX: action.payload.scale,
              scaleY: action.payload.scale,
              src: `${process.env.AUTH0_BASE_URL}/assets/models/flat-box/patterns/${action.payload.pattern}/${face}.jpg`,
            };
            obj[face].canvasTexture.backgroundImage = backgroundImage;
          });
          state.customFaces = obj;
        }
      }
    },
    updateSpecificCustomFaceOfBox: (state, action) => {
      const obj = { ...state.customFaces };
      obj[action.payload.face].texture = action.payload.texture;
      state.customFaces = obj;
    },
    resetCustomFacesForBox: (state) => {
      state.customFaces = {};
    },
    setBoxAttributes: (state, action) => {
      state.pattern = action.payload.pattern;
      state.color = action.payload.color;
      state.coating = action.payload.coating;
      state.gradient = action.payload.gradient;
      state.customFaces = action.payload.customFaces || {};
      state.colorType = action.payload.colorType;
      state.dimensions = action.payload.dimensions;
    },
  },
  selectors: {
    selectBoxPattern: (box) => box.pattern,
    selectBoxColor: (box) => box.color,
    selectBoxCoating: (box) => box.coating,
    selectBoxGradient: (box) => box.gradient,
    selectCurrentBoxFace: (box) => box.currentBoxFace,
    selectCurrentBoxLogo: (box) => box.currentBoxLogo,
    selectBoxColorType: (box) => box.colorType,
    selectBoxDimensions: (box) => box.dimensions,
    selectBoxLogos: (box) => box.boxLogos,
    selectCustomFacesForBox: (box) => box.customFaces,
    selectBoxAttributes: (box) => box,
  },
});

// Exporting action creators
export const {
  setBoxPattern,
  setBoxColor,
  setBoxCoating,
  setBoxAttributes,
  setBoxGradient,
  setBoxDimensions,
  setCustomFacesForBox,
  resetCustomFacesForBox,
  setBoxLogos,
  updateSpecificCustomFaceOfBox,
  updateCustomFacesOfBox,
  setCurrentBoxFace,
  setCurrentBoxLogo,
} = boxSlice.actions;

// Exporting selectors
export const {
  selectBoxPattern,
  selectBoxColor,
  selectBoxColorType,
  selectBoxGradient,
  selectBoxCoating,
  selectBoxAttributes,
  selectBoxDimensions,
  selectCustomFacesForBox,
  selectBoxLogos,
  selectCurrentBoxFace,
  selectCurrentBoxLogo,
} = boxSlice.selectors;
