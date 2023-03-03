import { configureStore } from '@reduxjs/toolkit'
import postSlice from './Reducer/PostReducer'
import userSlice from './Reducer/UserReducer'

export const store = configureStore({
    reducer: {
        post: postSlice.reducer,
        user: userSlice.reducer
    }
})