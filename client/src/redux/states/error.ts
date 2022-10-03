import { createSlice } from "@reduxjs/toolkit"

interface Errors {
    backendError: string
}

export const EmptyErrors: Errors = {
    backendError: '',
}

export const errorSlice = createSlice({
    name: 'errors',
    initialState: EmptyErrors,
    reducers: {
        createErrors: (state, action) => {
            return action.payload;
        },
        updateErrors: (state, action) => {
            const result = { ...state, ...action.payload };
            return result;
        },
        resetErrors: (state, action) => {
            return EmptyErrors;
        }
    }
});


export const { createErrors, updateErrors, resetErrors } = errorSlice.actions;

export default errorSlice.reducer;