import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        userloged: false,
    },
    reducers: {
        loginUser: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload.data))
            state.user = action.payload.data
            state.userloged = true
        },
        logoutUser: (state) => {
            localStorage.clear()
            state.user = []
            state.userloged = false
        },
        getCurrentUser: (state) => {
            state.user = JSON.parse(localStorage.getItem('profile'))
        },
        editUser: (state, action) => {
            const user = JSON.parse(localStorage.getItem('profile'))
            user.userDetails = { ...action.payload }
            localStorage.clear()
            localStorage.setItem('profile', JSON.stringify(user))
            state.user = user
        }
    }
})

export default userSlice
export const { loginUser, logoutUser, getCurrentUser, editUser } = userSlice.actions
