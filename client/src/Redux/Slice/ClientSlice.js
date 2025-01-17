import { createSlice } from "@reduxjs/toolkit";
import { getUsers, getUsers2, getUserUnique, getUserUnique2 } from '../Actions/Actions.js';

const initialState = {
    users: [],
    user: {},
    loading: false,
    error: null,
};

const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.users = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.users = [];
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUsers2.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers2.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers2.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserUnique.pending, (state) => {
                state.user = {};
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserUnique.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUserUnique.rejected, (state, action) => {
                state.user = {};
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserUnique2.pending, (state) => {
                state.user = {};
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserUnique2.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUserUnique2.rejected, (state, action) => {
                state.user = {};
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const getUserReducer = UsersSlice.reducer;