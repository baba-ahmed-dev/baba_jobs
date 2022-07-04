import { createSlice } from "@reduxjs/toolkit";

const Idaction = createSlice({
    name: 'idaction',
    initialState: {
        id:''
    },
    reducers : {
        
        idaction: (state, action )=> {
            state.id = action.payload;
        }
 
     }

    
})

export const {idaction} = Idaction.actions;
export default Idaction.reducer
