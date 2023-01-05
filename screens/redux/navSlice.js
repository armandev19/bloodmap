import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    baseUrl: "",
    userData: null,
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = navSlice.actions;

export const selectUserData = (state) => state.nav.userData;

export default navSlice.reducer;