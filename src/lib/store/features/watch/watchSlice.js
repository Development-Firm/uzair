import { createAppSlice } from "../../createAppSlice";

const initialState = {
    watchFace: 'round',
    watchStrap: 'orange',
    watchColor: 'none'
}
export const watchSlice = createAppSlice({
    name: 'watch',
    initialState,
    reducers: {
        setWatchFace: (state, action) => {
            state.watchFace = action.payload
        },
        setWatchStrap: (state, action) => {
            state.watchStrap = action.payload
        },
        setWatchColor: (state, action) => {
            state.watchColor = action.payload
        }
    },
    selectors: {
        selectWatchFace: watch => watch.watchFace,
        selectWatchStrap: watch => watch.watchStrap,
        selectWatchColor: watch => watch.watchColor
    }
})

export const { setWatchFace, setWatchStrap, setWatchColor } = watchSlice.actions

export const { selectWatchFace, selectWatchStrap, selectWatchColor } = watchSlice.selectors

export default watchSlice