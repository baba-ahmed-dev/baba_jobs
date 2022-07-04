import { createSlice } from "@reduxjs/toolkit";

const Profile = createSlice({
    name: 'profile',
    initialState: {
        id:''
    },
    reducers : {
        
        Profilesuccess : (state, action) => {
            state.id = action.payload;
        }
 
     }

    
})

export const {Profilesuccess} = Profile.actions;
export default Profile.reducer