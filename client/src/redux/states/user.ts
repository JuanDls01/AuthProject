import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";

export const EmptyUserState: UserInfo = {
    id: 0,
    name: '',
    email: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState: EmptyUserState,
    reducers: {
        createUser: (state, action: PayloadAction<UserInfo>) => action.payload,
        updateUser: (state, action) => ({ ...state, ...action.payload }),
        resetUser: () => EmptyUserState
    }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
