import { createSlice } from "@reduxjs/toolkit";

const Company = createSlice({
    name: 'company',
    initialState: {
        datacompany : []
    },
    reducers : {
        
        companysuccess : (state, action) => {
            state.datacompany = action.payload;
        }
 
     }

    
})

export const {companysuccess} = Company.actions;
export default Company.reducer