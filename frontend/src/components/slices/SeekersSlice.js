import { createSlice } from "@reduxjs/toolkit";

const Seeker = createSlice({
    name: 'seeker',
    initialState: {
        dataseeker : []
    },
    reducers : {
        
        seekersuccess : (state, action) => {
            state.dataseeker = action.payload;
        }
 
     }

    
})

export const {seekersuccess} = Seeker.actions;
export default Seeker.reducer