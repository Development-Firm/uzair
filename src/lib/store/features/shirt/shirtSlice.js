import { createAppSlice } from "../../createAppSlice";
const initialState = {
    shirtColor: '',
    shirtDesigns: [],
    selectedShirtDesign: {
        id: '',
        name: '',
        url: ''
    },
    selectedShirtLayer: 'base',
    shirtDesignMap: {
        base: {
            color: '',
            texture: ''
        },
        logo: {
            color: '',
            texture: ''
        },
        neck: {
            color: '',
            texture: ''
        }
    },
    shirtDesignTemplate: ''
}

const shirtSlice = createAppSlice({
    name: "shirt",
    initialState,
    reducers: {
        setShirtColor: (state, action) => {
            state.shirtColor = action.payload
        },
        setShirtDesigns: (state, action) => {
            state.shirtDesigns = action.payload
        },
        setSelectedShirtDesign: (state, action) => {
            state.selectedShirtDesign = action.payload
        },
        setSelectedShirtLayer: (state, action) => {
            state.selectedShirtLayer = action.payload
        },
        setShirtDesignMap: (state, action) => {
            state.shirtDesignMap = action.payload
        },
        setTemplateDesign: (state, action) => {
            state.shirtDesignMap = action.payload
        },
        setShirtDesignTemplate: (state, action)=>{
            state.shirtDesignTemplate = action.payload
        }

    },
    selectors: {
        selectShirtColor: shirt => shirt.shirtColor,
        selectShirtDesigns: shirt => shirt.shirtDesigns,
        selectSelectedShirtDesign: shirt => shirt.selectedShirtDesign,
        selectSelectedShirtLayer: shirt => shirt.selectedShirtLayer,
        selectShirtDesignMap: shirt => shirt.shirtDesignMap,
        selectShirtDesignTemplate: shirt=> shirt.shirtDesignTemplate

    }
})

export const { setShirtColor, setShirtDesigns, setSelectedShirtDesign, setSelectedShirtLayer, setShirtDesignMap, setShirtDesignTemplate } = shirtSlice.actions

export const { selectShirtColor, selectShirtDesigns, selectSelectedShirtDesign, selectSelectedShirtLayer, selectShirtDesignMap, selectShirtDesignTemplate } = shirtSlice.selectors

export default shirtSlice