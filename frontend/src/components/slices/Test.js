import { createSlice } from "@reduxjs/toolkit";


const infoSlice = createSlice({
    name: 'info',
    initialState: {
        userData:[],
        loading:null,
        error:false
    },

    reducers : {
       getInfo: (state, action) => {
           state.userData = state.userData.push(action.payload)
      },

       startAction : (state) => {
           state.loading= true;
       },
       successAction: (state, action) => {
           state.userData= action.payload;
           state.loading =null;
       },
       errorAction: (state) => {
           state.loading =null;
           state.error=true;
       }

    }
})

export const {getInfo,  startAction, successAction, errorAction} = infoSlice.actions;
export default infoSlice.reducer