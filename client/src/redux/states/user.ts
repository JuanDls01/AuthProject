import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageKey, Roles, UserInfo } from "../../models";
import { clearLocalStorage, persistLocalStorage } from "../../utilities";

export const EmptyUserState: UserInfo = {
    // token: '',
    // refresh_token: '',
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    group: Roles.USER,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: EmptyUserState,
    reducers: {
        createUser: (state, action) => {
            // const tokens = {
            //     'token': action.payload.token,
            //     'refresh_token': action.payload.refresh_token
            // }
            // persistLocalStorage(LocalStorageKey.TOKENS, tokens)
            return action.payload
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload };
            // persistLocalStorage(LocalStorageKey.TOKENS, tokens)
            // persistLocalStorage(LocalStorageKey.REFRESH_TOKEN, action.payload.refresh_token)
            return result
        },
        resetUser: () => {
            // clearLocalStorage(LocalStorageKey.TOKENS);
            // clearLocalStorage(LocalStorageKey.REFRESH_TOKEN)
            return EmptyUserState
        }
    }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
