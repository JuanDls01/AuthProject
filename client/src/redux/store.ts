import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models";
import userSliceReducer from "./states/user";

export interface AppStore {
    user: UserInfo
};

const store = configureStore<AppStore>({
    reducer: {
        user: userSliceReducer
    }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch