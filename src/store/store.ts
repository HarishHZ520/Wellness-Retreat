import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './slice/dataSlice'

export const store = configureStore({
    reducer: {
        retreats: dataSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>