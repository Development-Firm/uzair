import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { generalSlice } from './features/general/generalSlice'
import { boxSlice } from './features/box/boxSlice'
import watchSlice from './features/watch/watchSlice'
import shirtSlice from './features/shirt/shirtSlice'
import tableSlice from './features/table/tableSlice'
import sofaSlice from './features/sofa/sofaSlice'
import { dataVisualizationSlice } from './features/data-visualization/dataVisualizationSlice'

const rootReducer = combineSlices(generalSlice, boxSlice, watchSlice, shirtSlice, tableSlice, sofaSlice, dataVisualizationSlice)
export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false
        })
    })
}