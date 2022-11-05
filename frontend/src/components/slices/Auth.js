import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token:localStorage.getItem("token"),
        staff:null,
        isAuthenticated: null,
        isLoading:false,
        user:null,
    },
    reducers : {
        startAction : (state) => {
            state.isLoading = true;
        },
        register_success: (state, action) => {
            localStorage.setItem("token",action.payload.token);
            state.token = action.payload.token;
            state.isAuthenticated= true;
            state.user = action.payload.user;
            state.isLoading = false;
        },
        successAction: (state, action) => {
            state.isAuthenticated = true;
            state.staff = action.payload.is_admin_user;
            state.user = action.payload;
            state.isLoading = false;
        },
        errorAction: (state) => {
            localStorage.removeItem('token');
            state.token= null;
            state.user= null;
            state.staff = null,
            state.isLoading =false;
            state.isAuthenticated= false;
        }
 
     } 
})
export const {startAction, register_success, successAction,  errorAction} = authSlice.actions;
export default authSlice.reducer