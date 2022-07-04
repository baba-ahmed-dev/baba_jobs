import { createSlice } from "@reduxjs/toolkit";

const Detail = createSlice({
    name: 'detail',
    initialState: {
        id:''
    },
    reducers : {
        
        Detailsuccess : (state, action) => {
            state.id = action.payload;
        }
 
     }

    
})

export const {Detailsuccess} = Detail.actions;
export default Detail.reducer