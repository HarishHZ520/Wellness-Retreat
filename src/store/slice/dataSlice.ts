import { createSlice } from '@reduxjs/toolkit'

export interface DataItem {
    title: string
    description: string
    date: number
    location: string
    price: number
    type: string
    condition: string
    image: string
    tag: string[]
    duration: number
    id: string
}

interface DataState {
    items: DataItem[]
    loading: boolean
    error: string | null
}

const initialState: DataState = {
    items: [],
    loading: false,
    error: null,
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true
            state.error = null
        },
        fetchDataSuccess(state, action) {
            state.loading = false
            state.items = action.payload
        },
        fetchDataFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dataSlice.actions

export default dataSlice.reducer
