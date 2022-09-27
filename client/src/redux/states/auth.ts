import { createSlice } from "@reduxjs/toolkit";
import { Tokens } from "../../models";

export const EmptyCredential: Tokens = {
    access: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: EmptyCredential,
    reducers: {
        setCredential: (state, action) => {
            const result = { ...state, ...action.payload };
            return result;
        },
        logOut: (state, action) => {
            return EmptyCredential;
        }
    }
})

export const { setCredential, logOut } = authSlice.actions;

export default authSlice.reducer;
