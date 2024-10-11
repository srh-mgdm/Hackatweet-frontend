import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, username: null, name:null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(`- dans Redux: login 🔔`)
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
            state.value.name = action.payload.name;
        },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

